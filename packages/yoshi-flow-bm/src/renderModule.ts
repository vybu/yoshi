import path from 'path';
import fs from 'fs-extra';
import { FlowBMModel } from './createFlowBMModel';

const generateModuleCode = ({
  moduleId,
  exportedComponents,
  methods,
  pages,
  moduleInitPath,
  localePath,
}: FlowBMModel) => `
import { createModule } from 'yoshi-flow-bm-runtime';

createModule({
  moduleId: '${moduleId}',
  pages: [
    ${pages.map(
      ({ componentId, componentPath }) => `
      {
        componentId: '${componentId}',
        loadComponent: async () => (await import(/* webpackChunkName: "${componentId}" */'${componentPath}')).default,
      },
    `,
    )}
  ],
  exportedComponents: [
    ${exportedComponents.map(
      ({ componentId, componentPath }) => `
      {
        componentId: '${componentId}',
        loadComponent: async () => (await import(/* webpackChunkName: "${componentId}" */'${componentPath}')).default,
      },
    `,
    )}
  ],
  methods: [
    ${methods.map(
      ({ methodId, methodPath }) => `
      {
        methodId: '${methodId}',
        loadMethod: () => require('${methodPath}').default,
      }`,
    )}
  ], // ${JSON.stringify(methods)},
  ${moduleInitPath ? `moduleInit: require('${moduleInitPath}').default,` : ''}
  loadLocale: (locale = 'en') => import(/* webpackChunkName: "[request]" */\`${localePath}/\${locale}\`),
});`;

export const moduleEntryPath = path.resolve(__dirname, '../tmp/module.ts');

const renderModule = (model: FlowBMModel) =>
  fs.outputFileSync(moduleEntryPath, generateModuleCode(model));

export default renderModule;
