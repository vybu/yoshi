import {
  WidgetEditor,
  CustomEventHandler,
} from '@wix/bob-widget-services/dist/src/types/editorTypes';
import {
  ControllerStageDataManifest,
  EditorSDK,
} from '@wix/platform-editor-sdk';
import { panelUrlBuilder } from '../../utils/editor';
import { id as widgetId } from './.component.json';

const SETTINGS_EV_ID = `${widgetId}:settings`;

function openSettingsPanel(editorSDK: EditorSDK, { componentRef }: any) {
  editorSDK.editor.openComponentPanel('token', {
    title: 'Widget Settings',
    url: panelUrlBuilder(editorSDK, componentRef, 'firstWidget'),
    height: 240,
    componentRef,
  });
}

const widgetEventsHandler: CustomEventHandler = {
  widgetGfppClicked: {
    [SETTINGS_EV_ID]: (payload, editorSDK) =>
      openSettingsPanel(editorSDK, payload),
  },
};

const widgetStageData: ControllerStageDataManifest = {
  [widgetId]: {
    default: {
      gfpp: {
        desktop: {
          mainAction1: {
            actionId: SETTINGS_EV_ID,
            label: 'Settings',
          },
          iconButtons: {},
        },
        mobile: {
          iconButtons: {},
        },
      },
      displayName: 'FirstWidget',
      nickname: 'firstWidget',
    },
  },
};

function createWidget(): WidgetEditor {
  return {
    type: widgetId,
    getEventHandlers() {
      return widgetEventsHandler;
    },
    getStageData() {
      return widgetStageData;
    },
  };
}

export default createWidget();
