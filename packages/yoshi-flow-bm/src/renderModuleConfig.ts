import path from 'path';
import * as fs from 'fs-extra';
import { getProjectArtifactId } from 'yoshi-helpers/build/utils';
import { FlowBMModel } from './model';
import { MODULE_CONFIG_PATH } from './constants';

export default ({ pages, moduleId, config: { topology } }: FlowBMModel) => {
  const artifactId = `com.wixpress.${getProjectArtifactId()}`;
  const pageComponents = pages.map(({ componentId, componentName, route }) => ({
    pageComponentId: componentId,
    pageComponentName: componentName,
    route,
  }));

  const template = {
    moduleId,
    mainPageComponentId: pageComponents.reduce((prev, { route, ...rest }) =>
      route.split(path.delimiter).length >
      prev.route.split(path.delimiter).length
        ? prev
        : { ...rest, route },
    ).pageComponentId,
    pageComponents,

    config: { topology },
    bundles: [
      {
        file: {
          artifactId,
          path: 'module.bundle.min.js',
        },
        debugFile: {
          artifactId,
          path: 'module.bundle.js',
        },
      },
    ],
  };

  const templatePath = path.join(process.cwd(), MODULE_CONFIG_PATH(moduleId));

  fs.outputJSONSync(templatePath, template, { spaces: 2 });
};
