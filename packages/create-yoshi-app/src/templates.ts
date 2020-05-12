import { resolve } from 'path';
import { TemplateDefinition } from './TemplateModel';
import { OOI_TEMPLATE_NAME, PLATFORM_TEMPLATE_NAME } from './utils';

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
  templates.push({
    name: OOI_TEMPLATE_NAME,
    title: 'flow-editor - Out of iFrame',
    path: toTemplatePath('flow-editor'),
    language: ['typescript'],
  });
}

if (process.env.EXPERIMENTAL_PLATFORM_TEMPLATE === 'true') {
  templates.push({
    name: PLATFORM_TEMPLATE_NAME,
    title: 'flow-editor - Platform',
    path: toTemplatePath('flow-editor-platform'),
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
