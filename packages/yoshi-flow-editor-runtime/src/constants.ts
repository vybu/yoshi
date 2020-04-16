export const DEFAULT_WIX_SDK_SRC =
  'https://static.parastorage.com/services/js-sdk/1.190.0/js/wix-private.min.js';

export const OOI_WIDGET_COMPONENT_TYPE = 'ooi_widget';
export const PLATFORM_WIDGET_COMPONENT_TYPE = 'platform_widget';
export const PAGE_COMPONENT_TYPE = 'page';

export type WidgetType =
  | typeof OOI_WIDGET_COMPONENT_TYPE
  | typeof PLATFORM_WIDGET_COMPONENT_TYPE
  | typeof PAGE_COMPONENT_TYPE;
