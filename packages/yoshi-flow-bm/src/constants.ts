import { constantCase } from 'constant-case';

const EXTENSIONS = '{tsx,ts,jsx,js}';
export const CONFIG_EXT = 'json';

export const CONFIG_PATH = `.module.${CONFIG_EXT}`;

export const MODULE_CONFIG_PATH = (moduleId: string) =>
  `target/module_${constantCase(moduleId)}.json`;

export const PAGES_DIR = 'src/pages';
export const PAGES_PATTERN = `${PAGES_DIR}/**/*.${EXTENSIONS}`;
export const PAGES_CONFIG_PATTERN = `${PAGES_DIR}/**/*.${CONFIG_EXT}`;

export const EXPORTED_COMPONENTS_DIR = 'src/exported-components';
export const EXPORTED_COMPONENTS_PATTERN = `${EXPORTED_COMPONENTS_DIR}/**/*.${EXTENSIONS}`;
export const EXPORTED_COMPONENTS_CONFIG_PATTERN = `${EXPORTED_COMPONENTS_DIR}/**/*.${CONFIG_EXT}`;

export const METHODS_DIR = 'src/methods';
export const METHODS_PATTERN = `${METHODS_DIR}/**/*.${EXTENSIONS}`;
export const METHODS_CONFIG_PATTERN = `${METHODS_DIR}/**/*.${CONFIG_EXT}`;

export const MODULE_INIT_PATTERN = `src/moduleInit.${EXTENSIONS}`;

export const TRANSLATIONS_DIR = 'translations';
