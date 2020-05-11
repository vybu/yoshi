import React, { ComponentType } from 'react';
import ModuleProvider, { IBMModuleParams } from './hooks/ModuleProvider';

export default function wrapComponent(
  Component: ComponentType,
  deps: Array<ComponentType>,
): ComponentType<IBMModuleParams> {
  const children = deps.reduce(
    (children, Provider) => <Provider>{children}</Provider>,
    <Component />,
  );

  return props => (
    <ModuleProvider moduleParams={props}>{children}</ModuleProvider>
  );
}
