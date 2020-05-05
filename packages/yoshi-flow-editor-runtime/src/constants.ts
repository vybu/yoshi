export const DEFAULT_WIX_SDK_SRC =
  'https://static.parastorage.com/services/js-sdk/1.190.0/js/wix-private.min.js';

export const OOI_WIDGET_COMPONENT_TYPE = 'WIDGET_OUT_OF_IFRAME';
export const PLATFORM_WIDGET_COMPONENT_TYPE = 'STUDIO_WIDGET';
export const PAGE_COMPONENT_TYPE = 'PAGE_OUT_OF_IFRAME';

export type WidgetType =
  | typeof OOI_WIDGET_COMPONENT_TYPE
  | typeof PLATFORM_WIDGET_COMPONENT_TYPE
  | typeof PAGE_COMPONENT_TYPE;
