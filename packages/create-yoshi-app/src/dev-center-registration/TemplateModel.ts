import { DevCenterComponent } from './appService';

export default class TemplateModel {
  readonly appDefinitionId: string;
  readonly appName: string;
  readonly components: Array<DevCenterComponent>;

  constructor({
    appId,
    appName,
    components,
  }: {
    appId: string;
    appName: string;
    components: Array<DevCenterComponent>;
  }) {
    this.appDefinitionId = appId;
    this.appName = appName;
    this.components = components;
  }
}
