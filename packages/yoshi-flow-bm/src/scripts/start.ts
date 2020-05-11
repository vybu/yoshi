import path from 'path';
import arg from 'arg';
import fs from 'fs-extra';
import chalk from 'chalk';
import DevEnvironment from 'yoshi-common/build/dev-environment';
import { TARGET_DIR, BUILD_DIR } from 'yoshi-config/build/paths';
import { getServerStartFile } from 'yoshi-helpers/build/server-start-file';
import { v4 as uuid } from 'uuid';
import { CliCommand } from '../bin/yoshi-bm';
import {
  createClientWebpackConfig,
  createServerWebpackConfig,
} from '../webpack.config';
import createFlowBMModel, { watchFlowBMModel } from '../model';
import renderModule, { moduleEntryPath } from '../renderModule';
import renderModuleConfig from '../renderModuleConfig';

const join = (...dirs: Array<string>) => path.join(process.cwd(), ...dirs);

const start: CliCommand = async function(argv, config) {
  const args = arg(
    {
      // Types
      '--help': Boolean,
      '--server': String,
      '--production': Boolean,
      '--https': Boolean,
      '--debug': Boolean,
      '--debug-brk': Boolean,

      // Aliases
      '--entry-point': '--server',
      '-e': '--server',
    },
    { argv },
  );

  const {
    '--help': help,
    '--server': serverStartFileCLI,
    '--production': shouldRunAsProduction,
  } = args;

  if (help) {
    console.log(
      `
      Description
        Starts the application in development mode

      Usage
        $ yoshi-bm start

      Options
        --help, -h      Displays this message
        --server        (Deprecated!) The main file to start your server
        --url           Opens the browser with the supplied URL
        --production    Start using unminified production build
        --https         Serve the app bundle on https
        --debug         Allow app-server debugging
        --debug-brk     Allow app-server debugging, process won't start until debugger will be attached
    `,
    );

    process.exit(0);
  }

  let serverStartFile;
  try {
    serverStartFile = getServerStartFile(serverStartFileCLI);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  console.log(chalk.cyan('Starting development environment...\n'));

  if (shouldRunAsProduction) {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
  }

  await Promise.all([
    fs.emptyDir(join(BUILD_DIR)),
    fs.emptyDir(join(TARGET_DIR)),
  ]);

  watchFlowBMModel(model => {
    renderModule(model);
    renderModuleConfig(model);
  });

  const clientConfig = createClientWebpackConfig(config, {
    isDev: true,
    isHot: config.hmr as boolean,
  });
  clientConfig.entry = { module: moduleEntryPath };

  const serverConfig = createServerWebpackConfig(config, {
    isDev: true,
    isHot: true,
  });

  const { pages } = createFlowBMModel();

  const startUrl = `http://localhost:5000/business-manager/${uuid()}/${
    pages[0].route
  }`;

  const devEnvironment = await DevEnvironment.create({
    webpackConfigs: [clientConfig, serverConfig],
    https: config.servers.cdn.ssl,
    webpackDevServerPort: config.servers.cdn.port,
    serverFilePath: serverStartFile,
    appName: config.name,
    startUrl,
    enableClientHotUpdates: Boolean(config.hmr),
    createEjsTemplates: config.experimentalBuildHtml,
    yoshiServer: config.yoshiServer,
  });

  await devEnvironment.start();
};

export default start;
