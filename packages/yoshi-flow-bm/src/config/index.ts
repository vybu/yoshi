import path from 'path';
import { cosmiconfigSync } from 'cosmiconfig';
import { validate } from 'jest-validate';
import { CONFIG_EXT, CONFIG_PATH } from '../constants';
import {
  ExportedComponentConfig,
  InitialExportedComponentConfig,
  InitialMethodConfig,
  InitialModuleConfig,
  InitialPageConfig,
  MethodConfig,
  ModuleConfig,
  PageConfig,
} from './types';
import {
  validExportedComponentConfig,
  validPageConfig,
  validMethodConfig,
  validModuleConfig,
} from './validConfig';
import {
  normalizeExportedComponentConfig,
  normalizeMethodConfig,
  normalizeModuleConfig,
  normalizePageConfig,
} from './normalize';

const moduleCosmiconfig = cosmiconfigSync('yoshi-flow-bm/module', {
  searchPlaces: [CONFIG_PATH],
});

export function loadModuleConfig(cwd: string): ModuleConfig {
  const result = moduleCosmiconfig.search(cwd);

  const initialConfig: InitialModuleConfig = result?.config ?? {};

  validate(initialConfig, {
    exampleConfig: validModuleConfig,
  });

  return normalizeModuleConfig(initialConfig, cwd);
}

export function loadPageConfig(
  moduleConfig: ModuleConfig,
  pagePath: string,
): PageConfig {
  const { dir, name } = path.parse(pagePath);

  const pageCosmiconfig = cosmiconfigSync('yoshi-flow-bm/page', {
    searchPlaces: [`${name}.${CONFIG_EXT}`],
  });

  const result = pageCosmiconfig.search(dir);

  const initialConfig: InitialPageConfig = result?.config ?? {};

  validate(initialConfig, {
    exampleConfig: validPageConfig,
  });

  return normalizePageConfig(initialConfig, pagePath, name, moduleConfig);
}

export function loadExportedComponentConfig(
  moduleConfig: ModuleConfig,
  componentPath: string,
): ExportedComponentConfig {
  const { dir, name } = path.parse(componentPath);

  const componentCosmiconfig = cosmiconfigSync(
    'yoshi-flow-bm/exported-component',
    {
      searchPlaces: [`${name}.${CONFIG_EXT}`],
    },
  );

  const result = componentCosmiconfig.search(dir);

  const initialConfig: InitialExportedComponentConfig = result?.config ?? {};

  validate(initialConfig, {
    exampleConfig: validExportedComponentConfig,
  });

  return normalizeExportedComponentConfig(
    initialConfig,
    componentPath,
    name,
    moduleConfig,
  );
}

export function loadMethodConfig(
  moduleConfig: ModuleConfig,
  methodPath: string,
): MethodConfig {
  const { dir, name } = path.parse(methodPath);

  const methodCosmiconfig = cosmiconfigSync('yoshi-flow-bm/method', {
    searchPlaces: [`${name}.${CONFIG_EXT}`],
  });

  const result = methodCosmiconfig.search(dir);

  const initialConfig: InitialMethodConfig = result?.config ?? {};

  validate(initialConfig, {
    exampleConfig: validMethodConfig,
  });

  return normalizeMethodConfig(initialConfig, methodPath, name, moduleConfig);
}
