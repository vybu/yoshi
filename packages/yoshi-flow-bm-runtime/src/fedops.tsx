import React, { FC } from 'react';
import FedopsProvider from './hooks/FedopsProvider';

export { default as useFedops } from './hooks/useFedops';

export function createFedopsProvider(componentId: string) {
  const Provider: FC = ({ children }) => (
    <FedopsProvider appName={componentId}>{children}</FedopsProvider>
  );

  return Provider;
}
