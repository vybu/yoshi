import { EditorSDK } from '@wix/platform-editor-sdk';
import createAppAPI from './editor/appAPI';

const TOKEN = 'token';

export async function editorReady(editorSDK: EditorSDK) {
  await editorSDK.editor.setAppAPI(TOKEN, createAppAPI(editorSDK, TOKEN));
}
