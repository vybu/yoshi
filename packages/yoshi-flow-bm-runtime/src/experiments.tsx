import React, { FC } from 'react';
import { ExperimentsProvider } from '@wix/wix-experiments-react';

export { useExperiments } from '@wix/wix-experiments-react';

export function createExperimentsProvider(experimentsScopes: Array<string>) {
  const experimentsProp = { scope: experimentsScopes };

  const Provider: FC = ({ children }) => (
    <ExperimentsProvider options={experimentsProp}>
      {children}
    </ExperimentsProvider>
  );

  return Provider;
}
