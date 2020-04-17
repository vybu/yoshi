import React, { Suspense } from 'react';
import { PublicDataProvider } from './react/PublicData/PublicDataProvider';
import { ErrorBoundary } from './react/ErrorBoundary';
import { getEditorParams } from './utils';
import { SDKProvider } from './react/SDK/SDKProvider';
import { SDK } from './react/SDK/SDKRenderProp';

interface SettingsWrapperProps {
  __publicData__: Record<string, any>;
}

const SettingsWrapper = (UserComponent: typeof React.Component) => (
  props: SettingsWrapperProps,
) => {
  const { editorSDKSrc } = getEditorParams();

  return (
    <ErrorBoundary handleException={error => console.error(error)}>
      <Suspense fallback={<div>Loading...</div>}>
        <SDKProvider editorSDKSrc={editorSDKSrc}>
          <SDK editorSDKSrc={editorSDKSrc}>
            {sdk => {
              return (
                <PublicDataProvider sdk={sdk} data={props.__publicData__}>
                  <UserComponent />
                </PublicDataProvider>
              );
            }}
          </SDK>
        </SDKProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

export default SettingsWrapper;
