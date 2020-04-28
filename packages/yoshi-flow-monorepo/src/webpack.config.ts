import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import webpack from 'webpack';
import {
  validateServerEntry,
  createServerEntries,
} from 'yoshi-common/build/webpack-utils';
// @ts-ignore
import { StatsWriterPlugin } from 'webpack-stats-plugin';
import { createBaseWebpackConfig } from 'yoshi-common/build/webpack.config';
import { defaultEntry } from 'yoshi-helpers/build/constants';
import { Config } from 'yoshi-config/build/config';
import {
  isTypescriptProject,
  isSingleEntry,
  inTeamCity,
  isProduction as isProductionQuery,
} from 'yoshi-helpers/build/queries';
import { STATICS_DIR, SERVER_ENTRY } from 'yoshi-config/build/paths';
import ManifestPlugin from 'yoshi-common/build/manifest-webpack-plugin';
import { isObject } from 'lodash';
import { PackageGraphNode } from './load-package-graph';

const useTypeScript = isTypescriptProject();
const isProduction = isProductionQuery();

const defaultSplitChunksConfig = {
  chunks: 'all',
  name: 'commons',
  minChunks: 2,
};

const createDefaultOptions = (pkg: PackageGraphNode) => {
  const separateCss =
    pkg.config.separateCss === 'prod'
      ? inTeamCity() || isProduction
      : pkg.config.separateCss;

  return {
    name: pkg.config.name as string,
    useTypeScript,
    typeCheckTypeScript: false, // useTypeScript,
    useAngular: pkg.config.isAngularProject,
    devServerUrl: pkg.config.servers.cdn.url,
    cssModules: pkg.config.cssModules,
    separateCss,
  };
};

// TODO - thunderbolt-elements should be removed once editor-elements-library is source of truth for comps
const isThunderboltElementModule = (pkg: PackageGraphNode) =>
  pkg.name === 'thunderbolt-elements' || pkg.name === 'editor-elements-library';

const isThunderboltAppModule = (pkg: PackageGraphNode) =>
  pkg.name === '@wix/thunderbolt-app';

const isSiteAssetsModule = (pkg: PackageGraphNode) =>
  pkg.name === 'thunderbolt-becky' || pkg.name === '@wix/thunderbolt-becky';

export function createClientWebpackConfig(
  rootConfig: Config,
  pkg: PackageGraphNode,
  {
    isDev,
    isHot,
    suricate,
    isAnalyze,
    forceEmitSourceMaps,
    forceEmitStats,
  }: {
    isDev?: boolean;
    isHot?: boolean;
    suricate?: boolean;
    isAnalyze?: boolean;
    forceEmitSourceMaps?: boolean;
    forceEmitStats?: boolean;
  } = {},
): webpack.Configuration {
  const entry = pkg.config.entry || defaultEntry;

  const defaultOptions = createDefaultOptions(pkg);

  const clientConfig = createBaseWebpackConfig({
    cwd: pkg.location,
    configName: 'client',
    target: 'web',
    isDev,
    isHot,
    suricate,
    isMonorepo: true,
    isAnalyze,
    forceEmitSourceMaps,
    forceEmitStats,
    exportAsLibraryName: pkg.config.exports,
    enhancedTpaStyle: pkg.config.enhancedTpaStyle,
    tpaStyle: pkg.config.tpaStyle,
    separateStylableCss: pkg.config.separateStylableCss,
    createEjsTemplates: pkg.config.experimentalBuildHtml,
    useCustomSourceMapPlugin:
      isThunderboltElementModule(pkg) || isThunderboltAppModule(pkg),
    ...(isSiteAssetsModule(pkg)
      ? {
          configName: 'site-assets',
          target: 'node',
          useNodeExternals: false,
        }
      : {}),
    ...defaultOptions,
  });

  if (isSiteAssetsModule(pkg)) {
    // Apply manifest since standard `node` webpack configs don't
    clientConfig.plugins!.push(
      new ManifestPlugin({ fileName: 'manifest', isDev: isDev as boolean }),
    );
    clientConfig.output!.path = path.join(pkg.location, STATICS_DIR);
    clientConfig.output!.filename = isDev
      ? '[name].bundle.js'
      : '[name].[contenthash:8].bundle.min.js';
    clientConfig.output!.chunkFilename = isDev
      ? '[name].chunk.js'
      : '[name].[contenthash:8].chunk.min.js';
  }

  if (isThunderboltElementModule(pkg)) {
    clientConfig.optimization!.runtimeChunk = false;
  }

  clientConfig.entry = isSingleEntry(entry) ? { app: entry as string } : entry;
  clientConfig.resolve!.alias = pkg.config.resolveAlias;
  clientConfig.externals = pkg.config.externals;

  const useSplitChunks = pkg.config.splitChunks;

  // Thunderbolt and editor elements need a smaller version
  // of the stats to be uploaded to the cdn
  // This is being analyzed later on during render time
  if (isThunderboltElementModule(pkg) || isThunderboltAppModule(pkg)) {
    let statsFileName: string | null = null;

    // build command, production bundle
    if (isProduction && !isDev) {
      statsFileName = 'stats.min.json';
    }

    // start command, development bundle
    if (!isProduction && isDev) {
      statsFileName = 'stats.json';
    }

    // We want to emit the production stats only when running yoshi build
    // We want to emit the development stats only when running yoshi start
    if (statsFileName) {
      clientConfig.plugins!.push(
        new StatsWriterPlugin({
          filename: statsFileName,
          // https://webpack.js.org/configuration/stats/#stats
          stats: {
            all: false,
            chunkGroups: true,
            publicPath: true,
          },
          transform(data: webpack.Stats.ToJsonOutput) {
            // By default, the stats file contain spaces an indentation
            // This verifies it's minified
            return JSON.stringify(data);
          },
        }),
      );
    }
  }

  if (useSplitChunks) {
    const splitChunksConfig = isObject(useSplitChunks)
      ? useSplitChunks
      : defaultSplitChunksConfig;

    clientConfig!.optimization!.splitChunks = splitChunksConfig as webpack.Options.SplitChunksOptions;
  }

  return clientConfig;
}

export function createServerWebpackConfig(
  rootConfig: Config,
  libs: Array<PackageGraphNode>,
  pkg: PackageGraphNode,
  { isDev, isHot }: { isDev?: boolean; isHot?: boolean } = {},
): webpack.Configuration {
  const defaultOptions = createDefaultOptions(pkg);

  const serverConfig = createBaseWebpackConfig({
    cwd: pkg.location,
    configName: 'server',
    target: 'node',
    isDev,
    isHot,
    isMonorepo: true,
    useNodeExternals: !isThunderboltElementModule(pkg),
    nodeExternalsWhitelist: libs.map(pkg => new RegExp(pkg.name)),
    useAssetRelocator: pkg.config.experimentalUseAssetRelocator,
    forceMinimizeServer: isThunderboltElementModule(pkg),
    forceSpecificNodeExternals:
      isThunderboltAppModule(pkg) || isThunderboltElementModule(pkg),
    ...defaultOptions,
  });

  if (isThunderboltElementModule(pkg)) {
    // output to /dist/statics so it's available for thunderbolt to download
    serverConfig.output!.path = path.join(pkg.location, STATICS_DIR);

    // create only 1 file regardless of dynamic imports so it's easier to download
    serverConfig.plugins!.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    );

    // use cheap source maps to make download faster
    serverConfig.devtool = 'inline-cheap-source-map';
  }

  serverConfig.entry = async () => {
    const serverEntry = validateServerEntry({
      cwd: pkg.location,
      extensions: serverConfig.resolve!.extensions as Array<string>,
      yoshiServer: pkg.config.yoshiServer,
    });

    let entryConfig = pkg.config.yoshiServer
      ? createServerEntries(serverConfig.context as string, pkg.location)
      : {};

    if (serverEntry) {
      entryConfig = { ...entryConfig, [SERVER_ENTRY]: serverEntry };
    }

    return entryConfig;
  };

  return serverConfig;
}

export function createWebWorkerWebpackConfig(
  rootConfig: Config,
  pkg: PackageGraphNode,
  {
    isDev,
    isHot,
    isAnalyze,
    forceEmitStats,
  }: {
    isDev?: boolean;
    isHot?: boolean;
    isAnalyze?: boolean;
    forceEmitStats?: boolean;
  } = {},
): webpack.Configuration {
  const defaultOptions = createDefaultOptions(pkg);

  const workerConfig = createBaseWebpackConfig({
    cwd: pkg.location,
    configName: 'web-worker',
    target: isThunderboltElementModule(pkg) ? 'async-webworker' : 'webworker',
    isDev,
    isHot,
    isMonorepo: true,
    createEjsTemplates: pkg.config.experimentalBuildHtml,
    isAnalyze,
    forceEmitStats,
    ...defaultOptions,
  });

  // Use inline source maps since Thunderbolt loads worker as a blob locally
  if (!isProduction) {
    workerConfig.devtool = 'inline-source-map';
  }

  workerConfig.output!.library = '[name]';
  workerConfig.output!.libraryTarget = 'umd';
  workerConfig.output!.globalObject = 'self';

  workerConfig.entry = pkg.config.webWorkerEntry;

  workerConfig.externals = pkg.config.webWorkerExternals;

  return workerConfig;
}

export function createWebWorkerServerWebpackConfig(
  pkg: PackageGraphNode,
  { isDev, isHot }: { isDev?: boolean; isHot?: boolean } = {},
): webpack.Configuration {
  const defaultOptions = createDefaultOptions(pkg);

  const workerConfig = createBaseWebpackConfig({
    cwd: pkg.location,
    configName: 'web-worker-server',
    target: isThunderboltElementModule(pkg) ? 'async-webworker' : 'webworker',
    isDev,
    isHot,
    isMonorepo: true,
    createWorkerManifest: false,
    ...defaultOptions,
  });

  workerConfig.output!.library = '[name]';
  workerConfig.output!.libraryTarget = 'umd';
  workerConfig.output!.globalObject = 'self';

  workerConfig.entry = pkg.config.webWorkerServerEntry;

  workerConfig.plugins!.push(
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  );

  return workerConfig;
}
