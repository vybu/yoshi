import { createWidgetAPI, WidgetEditorAPI } from '@wix/bob-widget-services';
import { EditorSDK } from '@wix/platform-editor-sdk';

function createAppAPI(editorSDK: EditorSDK, token: string): WidgetEditorAPI {
  const widgetAPI = createWidgetAPI(editorSDK, token);

  return {
    ...widgetAPI,
  };
}

export default createAppAPI;
