import { EditorSDK, ComponentRef } from '@wix/platform-editor-sdk';

const getEditorSdkSource = (editorSDK: EditorSDK) =>
  editorSDK.info.getSdkVersion('token').scriptSrc;

export const panelUrlBuilder = (
  editorSDK: EditorSDK,
  componentRef: ComponentRef,
  panelName: string,
) => {
  const inWatchMode = process.env.NODE_ENV !== 'production';
  // During yoshi-flow-editor start we want have local rendered settings panel. For prod - we are using static html file.
  const baseUrl = inWatchMode
    ? `https://localhost:3000/settings/${panelName}`
    : `./settings/${panelName}.html`;

  return `${baseUrl}?wix-sdk-version=${getEditorSdkSource(
    editorSDK,
  )}&componentId=${componentRef.id}`;
};
