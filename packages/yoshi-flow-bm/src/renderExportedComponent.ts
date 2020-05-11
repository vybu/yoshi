import path from 'path';
import fs from 'fs-extra';
import { ExportedComponentModel, FlowBMModel } from './model';
import {
  shouldAddExperiments,
  shouldAddFedops,
  shouldAddSentry,
} from './queries';
import { EXPORTED_COMPONENTS_DIR } from './constants';

const generateExportedComponentCode = (
  component: ExportedComponentModel,
  model: FlowBMModel,
) => {
  const addExperiments = shouldAddExperiments(model);
  const addSentry = shouldAddSentry(model);
  const addFedops = shouldAddFedops(model);

  return `
import Component from '${component.absolutePath}';
import {
  wrapComponent,
  ${addExperiments ? 'createExperimentsProvider,' : ''}
  ${addSentry ? 'createSentryProvider,' : ''}
  ${addFedops ? 'createFedopsProvider,' : ''}
} from 'yoshi-flow-bm-runtime';


export default wrapComponent(Component, [
  ${
    addExperiments
      ? `createExperimentsProvider(${JSON.stringify(
          model.config.experimentsScopes,
        )}),\n`
      : ''
  }
  ${addSentry ? `createSentryProvider(${model.config.sentryDsn}),` : ''}
  ${addFedops ? `createFedopsProvider(${component.componentId}),` : ''}
]);
  `;
};

const renderExportedComponent = (
  component: ExportedComponentModel,
  model: FlowBMModel,
) => {
  const componentEntry = path.join(
    path.resolve(__dirname, `../tmp/${EXPORTED_COMPONENTS_DIR}`),
    component.relativePath,
  );
  fs.outputFileSync(
    componentEntry,
    generateExportedComponentCode(component, model),
  );
};

export default renderExportedComponent;
