import path from 'path';
import * as fs from 'fs-extra';
import { getProjectArtifactId } from 'yoshi-helpers/build/utils';
import { constantCase } from 'constant-case';
import { FlowBMModel } from './createFlowBMModel';

export default ({ pages, moduleId }: FlowBMModel) => {
  const artifactId = `com.wixpress.${getProjectArtifactId()}`;
  const routeNamespace = moduleId;
  const pagesDir = path.join(process.cwd(), 'src/pages');

  const pageComponents = pages.map(({ componentPath }) => {
    const { name } = path.parse(componentPath);

    const pageComponentId = `${moduleId}.pages.${name}`;
    const relativePath = path.relative(pagesDir, componentPath);

    const route = path.join(
      routeNamespace,
      ...relativePath.split(path.delimiter).slice(0, -1),
      name !== 'index' ? name : '',
    );

    return {
      pageComponentId,
      pageComponentName: pageComponentId,
      route,
    };
  });

  const template = {
    moduleId,
    mainPageComponentId: pageComponents.reduce((prev, { route, ...rest }) =>
      route.split(path.delimiter).length >
      prev.route.split(path.delimiter).length
        ? prev
        : { ...rest, route },
    ).pageComponentId,
    pageComponents,

    config: {
      topology: {
        staticsUrl: {
          artifactId,
        },
      },
    },
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

  const templatePath = path.join(
    process.cwd(),
    `app-config-templates/module_${constantCase(moduleId)}.json`,
  );

  fs.outputJSONSync(templatePath, template, { spaces: 2 });
};
