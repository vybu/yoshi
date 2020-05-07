import path from 'path';
import arg from 'arg';
import fs from 'fs-extra';
import chalk from 'chalk';
import {
  printBuildResult,
  printBundleSizeSuggestion,
} from 'yoshi-common/build/print-build-results';
import WebpackManager from 'yoshi-common/build/webpack-manager';
import {
  STATICS_DIR,
  TARGET_DIR,
  SERVER_CHUNKS_BUILD_DIR,
  SERVER_BUNDLE,
} from 'yoshi-config/build/paths';
import { inTeamCity as checkInTeamCity } from 'yoshi-helpers/build/queries';
import { copyTemplates } from 'yoshi-common/build/copy-assets';
import { stripOrganization } from 'yoshi-helpers/build/utils';
import { cliCommand } from '../bin/yoshi-monorepo';
import {
  createClientWebpackConfig,
  createServerWebpackConfig,
  createWebWorkerWebpackConfig,
  createWebWorkerServerWebpackConfig,
  createSiteAssetsWebpackConfig,
} from '../webpack.config';
import buildPkgs from '../build';
import { isSiteAssetsModule } from '../utils';

const inTeamCity = checkInTeamCity();

const build: cliCommand = async function(argv, rootConfig, { apps, libs }) {
  const args = arg(
    {
      // Types
      '--help': Boolean,
      '--analyze': Boolean,
      '--stats': Boolean,
      '--source-map': Boolean,

      // Aliases
      '-h': '--help',
    },
    { argv },
  );

  const {
    '--help': help,
    '--analyze': isAnalyze,
    '--stats': forceEmitStats,
    '--source-map': forceEmitSourceMaps,
  } = args;

  if (help) {
    console.log(
      `
      Description
        Compiles the application for production deployment

      Usage
        $ yoshi-monorepo build [app-name ...]

      Options
        --help, -h      Displays this message
        --analyze       Run webpack-bundle-analyzer
        --stats         Emit webpack's stats file on "target/webpack-stats.json"
        --source-map    Emit bundle source maps
    `,
    );

    process.exit(0);
  }

  const appNames = args._;

  if (appNames.length) {
    appNames.forEach(appName => {
      const pkg = apps.find(pkg => stripOrganization(pkg.name) === appName);

      if (!pkg) {
        console.log(
          `Could not find an app with the name of ${chalk.cyan(appName)}!\n`,
        );

        console.log('Apps found:');
        console.log(
          `  ${apps
            .map(({ name }) => name)
            .map(stripOrganization)
            .map(name => chalk.cyanBright(name))
            .join(', ')}`,
        );
        console.log();
        console.log(chalk.red('Aborting...'));

        return process.exit(1);
      }
    });

    apps = apps.filter(app => appNames.includes(stripOrganization(app.name)));
  }

  await buildPkgs([...libs, ...apps]);

  await Promise.all(
    apps.reduce((acc: Array<Promise<void>>, app) => {
      return [
        ...acc,
        fs.emptyDir(path.join(app.location, STATICS_DIR)),
        fs.emptyDir(path.join(app.location, TARGET_DIR)),
        fs.emptyDir(path.join(app.location, SERVER_CHUNKS_BUILD_DIR)),
        fs.unlink(path.join(app.location, SERVER_BUNDLE)).catch(() => {}),
      ];
    }, []),
  );

  await Promise.all(apps.map(app => copyTemplates(app.location)));

  if (inTeamCity) {
    const petriSpecs = await import('yoshi-common/build/sync-petri-specs');
    const wixMavenStatics = await import('yoshi-common/build/maven-statics');

    await Promise.all(
      apps.reduce((acc: Array<Promise<void>>, app) => {
        return [
          ...acc,
          petriSpecs.default({
            config: app.config.petriSpecsConfig,
            cwd: app.location,
          }),
          wixMavenStatics.default({
            clientProjectName: app.config.clientProjectName,
            staticsDir: app.config.clientFilesPath,
            cwd: app.location,
          }),
        ];
      }, []),
    );
  }

  const webpackManager = new WebpackManager();

  // If there are more than 2 applications, the screen size
  // is just not big enough for the fancy progress bar
  // so we configure it to not be showed
  if (apps.length > 2) {
    process.env.PROGRESS_BAR = 'false';
  }

  apps.forEach(pkg => {
    let clientDebugConfig;
    let clientOptimizedConfig;
    let siteAssetsConfig;

    if (isSiteAssetsModule(pkg)) {
      siteAssetsConfig = createSiteAssetsWebpackConfig(
        rootConfig,
        pkg,
        libs,
        apps,
        {
          isDev: false,
          isAnalyze,
          forceEmitSourceMaps,
          forceEmitStats,
        },
      );
    } else {
      clientDebugConfig = createClientWebpackConfig(
        rootConfig,
        pkg,
        libs,
        apps,
        {
          isDev: true,
          forceEmitSourceMaps,
        },
      );

      clientOptimizedConfig = createClientWebpackConfig(
        rootConfig,
        pkg,
        libs,
        apps,
        {
          isAnalyze,
          forceEmitSourceMaps,
          forceEmitStats,
        },
      );
    }

    const serverConfig = createServerWebpackConfig(
      rootConfig,
      pkg,
      libs,
      apps,
      {
        isDev: true,
      },
    );

    let webWorkerConfig;
    let webWorkerOptimizeConfig;

    if (pkg.config.webWorkerEntry) {
      webWorkerConfig = createWebWorkerWebpackConfig(
        rootConfig,
        pkg,
        libs,
        apps,
        {
          isDev: true,
        },
      );

      webWorkerOptimizeConfig = createWebWorkerWebpackConfig(
        rootConfig,
        pkg,
        libs,
        apps,
        {
          isAnalyze,
          forceEmitStats,
        },
      );
    }

    let webWorkerServerConfig;

    if (pkg.config.webWorkerServerEntry) {
      webWorkerServerConfig = createWebWorkerServerWebpackConfig(
        rootConfig,
        pkg,
        libs,
        apps,
        {
          isDev: true,
        },
      );
    }

    webpackManager.addConfigs(pkg.name, [
      clientDebugConfig,
      clientOptimizedConfig,
      serverConfig,
      webWorkerConfig,
      webWorkerOptimizeConfig,
      webWorkerServerConfig,
      siteAssetsConfig,
    ]);
  });

  const { getAppData } = await webpackManager.run();

  apps.forEach(pkg => {
    console.log(chalk.bold.underline(pkg.name));
    console.log();

    if (isSiteAssetsModule(pkg)) {
      const [serverStats, siteAssetsStats] = getAppData(pkg.name).stats;

      printBuildResult({
        webpackStats: [siteAssetsStats, serverStats],
        cwd: pkg.location,
      });
    } else {
      const [, clientOptimizedStats, serverStats] = getAppData(pkg.name).stats;

      printBuildResult({
        webpackStats: [clientOptimizedStats, serverStats],
        cwd: pkg.location,
      });
    }
    console.log();
  });

  printBundleSizeSuggestion();
};

export default build;
