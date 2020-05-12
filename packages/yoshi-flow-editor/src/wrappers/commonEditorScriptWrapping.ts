import path from 'path';
import fs from 'fs-extra';
import { PLATFORM_WIDGET_COMPONENT_TYPE } from 'yoshi-flow-editor-runtime/build/constants';
import { FlowEditorModel, ComponentModel } from '../model';
import editorScriptEntry from './templates/CommonEditorScriptEntry';
import { TemplateControllerConfig } from './templates/CommonViewerScriptEntry';

const isConfigured = (component: ComponentModel): boolean => {
  return !!component.id && !!component.editorControllerFileName;
};

const toControllerMeta = (
  component: ComponentModel,
): TemplateControllerConfig => {
  return {
    controllerFileName: component.editorControllerFileName!,
    id: component.id,
    widgetType: component.type,
  };
};

const editorScriptWrapper = (
  generatedWidgetEntriesPath: string,
  model: FlowEditorModel,
) => {
  if (!model.editorEntryFileName) {
    return {};
  }

  const controllersMeta: Array<TemplateControllerConfig> = model.components
    .filter(isConfigured)
    .map(toControllerMeta);

  const shouldUseAppBuilder = controllersMeta.some(
    meta => meta.widgetType === PLATFORM_WIDGET_COMPONENT_TYPE,
  );

  const generatedEditorScriptEntryPath = path.join(
    generatedWidgetEntriesPath,
    'editorScript.js',
  );

  const generateEditorScriptEntryContent = editorScriptEntry({
    editorEntryFileName: model.editorEntryFileName,
    controllersMeta,
    shouldUseAppBuilder,
  });

  fs.outputFileSync(
    generatedEditorScriptEntryPath,
    generateEditorScriptEntryContent,
  );

  return {
    editorScript: generatedEditorScriptEntryPath,
  };
};

export default editorScriptWrapper;
