import path from 'path';
import fs from 'fs-extra';
import { FlowBMModel, PageModel } from './model';
import {
  shouldAddExperiments,
  shouldAddFedops,
  shouldAddSentry,
} from './queries';
import { PAGES_DIR } from './constants';

const generatePageCode = (page: PageModel, model: FlowBMModel) => {
  const addExperiments = shouldAddExperiments(model);
  const addSentry = shouldAddSentry(model);
  const addFedops = shouldAddFedops(model);

  return `
import Component from '${page.absolutePath}';
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
  ${addFedops ? `createFedopsProvider(${page.componentId}),` : ''}
]);
  `;
};

const renderPage = (page: PageModel, model: FlowBMModel) => {
  const pageEntry = path.join(
    path.resolve(__dirname, `../tmp/${PAGES_DIR}`),
    page.relativePath,
  );
  fs.outputFileSync(pageEntry, generatePageCode(page, model));
};

export default renderPage;
