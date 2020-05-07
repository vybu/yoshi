import { resolve } from 'path';
import { TemplateDefinition } from './TemplateModel';

const toTemplatePath = (templateName: string) =>
  resolve(__dirname, '../templates', templateName);

const templates: Array<TemplateDefinition> = [
  {
    name: 'fullstack',
    path: toTemplatePath('fullstack'),
    language: ['typescript', 'javascript'],
  },
  {
    name: 'client',
    path: toTemplatePath('client'),
    language: ['typescript', 'javascript'],
  },
  {
    name: 'business-manager-module',
    path: toTemplatePath('business-manager-module'),
    language: ['typescript', 'javascript'],
  },
  {
    name: 'server',
    path: toTemplatePath('server'),
    language: ['typescript', 'javascript'],
  },
  {
    name: 'library',
    path: toTemplatePath('library'),
    language: ['typescript', 'javascript'],
  },
  {
    name: 'out-of-iframe',
    path: toTemplatePath('out-of-iframe'),
    language: ['typescript', 'javascript'],
  },
];

if (process.env.EXPERIMENTAL_FLOW_BM === 'true') {
  templates.push({
    name: 'flow-bm',
    path: toTemplatePath('flow-bm'),
    language: ['typescript'],
  });
}
if (process.env.EXPERIMENTAL_FLOW_EDITOR === 'true') {
  const usePlatformTemplate =
    process.env.EXPERIMENTAL_PLATFORM_TEMPLATE === 'true';

  templates.push({
    name: 'flow-editor',
    path: toTemplatePath(
      usePlatformTemplate ? 'flow-editor-platform' : 'flow-editor',
    ),
    language: ['typescript'],
  });
}

if (process.env.EXPERIMENTAL_FLOW_LIBRARY === 'true') {
  templates.push({
    name: 'flow-library',
    path: toTemplatePath('flow-library'),
    language: ['typescript'],
  });
}

export default templates;
