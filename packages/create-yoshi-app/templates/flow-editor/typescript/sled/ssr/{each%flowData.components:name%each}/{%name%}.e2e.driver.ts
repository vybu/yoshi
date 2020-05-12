/// <reference types="sled-test-runner" />
import { CommonViewerDriver } from '../CommonViewerDriver';
import { id as widgetId } from '../../../src/components/{%name%}/.component.json';

export class ViewerE2EDriver extends CommonViewerDriver {
  name: string = '{%name%}';
  widgetId: string = widgetId;

  async getAppTitle() {
    return this.page.$eval('h2', (e: HTMLElement) => e.innerText);
  }
}
