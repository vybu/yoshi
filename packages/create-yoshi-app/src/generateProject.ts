import path from 'path';
import { outputFileSync } from 'fs-extra';
import getFilesInDir from './getFilesInDir';
import { replaceTemplates, getTemplateScopes } from './template-utils';
import getValuesMap from './getValuesMap';
import TemplateModel from './TemplateModel';

const processFileWithScope = (
  fileName: string,
  fileContent: string,
  scope: Record<string, any>,
) => {
  const transformed = replaceTemplates(fileContent, scope);
  const transformedPath = replaceTemplates(fileName, scope);

  outputFileSync(transformedPath, transformed);
};

const processFilesWithScopes = (
  files: Record<string, string>,
  scope: Record<string, any>,
  workingDir: string,
) => {
  return Object.keys(files).forEach(fileName => {
    const fullPath = path.join(workingDir, fileName);
    const scopes = getTemplateScopes(fileName, scope);

    scopes.forEach(loopScope => {
      processFileWithScope(fullPath, files[fileName], loopScope);
    });
  });
};

export default (templateModel: TemplateModel, workingDir: string) => {
  const valuesMap = getValuesMap(templateModel);
  const files = getFilesInDir(templateModel.getPath());

  processFilesWithScopes(files, valuesMap, workingDir);
};
