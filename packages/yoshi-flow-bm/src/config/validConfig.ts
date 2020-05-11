import { multipleValidOptions } from 'jest-validate';
import {
  InitialExportedComponentConfig,
  InitialMethodConfig,
  InitialModuleConfig,
  InitialPageConfig,
} from './types';

export const validModuleConfig: InitialModuleConfig = {
  moduleId: 'module-id',
  routeNamespace: 'some-route',
  sentryDsn: '1337',
  experimentsScopes: ['yoshi', 'wos'],
  topology: multipleValidOptions(
    {
      fooUrl: { artifactId: 'foo' },
    },
    { barUrl: { artifactId: 'bar' } },
  ),
};

export const validPageConfig: InitialPageConfig = {
  componentId: 'component-id',
  componentName: 'component-name',
};

export const validExportedComponentConfig: InitialExportedComponentConfig = {
  componentId: 'component-id',
};

export const validMethodConfig: InitialMethodConfig = {
  methodId: 'method-id',
};
