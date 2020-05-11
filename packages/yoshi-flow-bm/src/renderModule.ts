import path from 'path';
import fs from 'fs-extra';
import { FlowBMModel } from './model';
import renderPage from './renderPage';
import renderExportedComponent from './renderExportedComponent';
import { EXPORTED_COMPONENTS_DIR, PAGES_DIR } from './constants';

const generateModuleCode = ({
  moduleId,
  exportedComponents,
  methods,
  pages,
  moduleInitPath,
  config: { sentryDsn },
}: FlowBMModel) => `
import { createModule } from 'yoshi-flow-bm-runtime';

createModule({
  moduleId: '${moduleId}',
  pages: [
    ${pages.map(
      ({ componentId, componentName, relativePath }) => `
      {
        componentId: '${componentId}',
        componentName: '${componentName}',
        loadComponent: async () => (await import(/* webpackChunkName: "${componentName}" */'./${PAGES_DIR}/${relativePath}')).default,
      },
    `,
    )}
  ],
  exportedComponents: [
    ${exportedComponents.map(
      ({ componentId, relativePath }) => `
      {
        componentId: '${componentId}',
        loadComponent: async () => (await import(/* webpackChunkName: "${componentId}" */'./${EXPORTED_COMPONENTS_DIR}/${relativePath}')).default,
      },
    `,
    )}
  ],
  methods: [
    ${methods.map(
      ({ methodId, absolutePath }) => `
      {
        methodId: '${methodId}',
        loadMethod: () => require('${absolutePath}').default,
      }`,
    )}
  ], // ${JSON.stringify(methods)},
  ${moduleInitPath ? `moduleInit: require('${moduleInitPath}').default,` : ''}
  ${sentryDsn ? `sentryDsn: '${sentryDsn}',` : ''}
});`;

export const moduleEntryPath = path.resolve(__dirname, '../tmp/module.ts');

const renderModule = (model: FlowBMModel) => {
  model.pages.forEach(page => renderPage(page, model));

  model.exportedComponents.forEach(component =>
    renderExportedComponent(component, model),
  );

  fs.outputFileSync(moduleEntryPath, generateModuleCode(model));
};

export default renderModule;
