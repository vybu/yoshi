import { editorScriptBuilder } from '@wix/bob-widget-services';
import { EditorSDK } from '@wix/platform-editor-sdk';
import createAppAPI from './editor/appAPI';
import firstWidget from './components/firstWidget/editor.controller';

const TOKEN = 'token';

async function editorReady(editorSDK: EditorSDK) {
  await editorSDK.editor.setAppAPI(TOKEN, createAppAPI(editorSDK, TOKEN));
}

export default editorScriptBuilder()
  .withEditorReady(editorReady)
  .withWidget(firstWidget)
  .build();
