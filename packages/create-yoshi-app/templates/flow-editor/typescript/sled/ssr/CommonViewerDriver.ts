/// <reference types="sled-test-runner" />
import { Page, DirectNavigationOptions } from 'puppeteer';
import { appDefinitionId } from '../../.application.json';

export interface IBootstrapConfig {
  ssr?: boolean;
  mobileView?: boolean;
  navigationOptions?: DirectNavigationOptions;
  cookieExperiments?: Array<{ key: string; val: string }>;
}

export class CommonViewerDriver {
  page: Page;
  widgetId: string;
  name: string;

  private getRemoteConfig(
    url: string,
    params: {
      mobileView: boolean;
      ssr: boolean;
    },
  ) {
    return sled
      .url(url)
      .withSsrWarmupOnly(params.ssr)
      .withShowMobileView(params.mobileView)
      .withWidgetUrlOverride(
        this.widgetId,
        `${this.name}ViewerWidget.bundle.min.js`,
      )
      .withViewerScriptOverride(appDefinitionId, 'viewerScript.bundle.min.js')
      .build();
  }

  private async makeScreenshotBySelector(selector: string) {
    const rootEl = await this.page.$(selector);
    return rootEl.screenshot();
  }

  async goto(targetUrl: string, config: IBootstrapConfig) {
    const ssr = (config && config.ssr) || false;
    const mobileView = (config && config.mobileView) || false;

    const url = this.getRemoteConfig(targetUrl, { mobileView, ssr });

    const { page } = await sled.newPage({
      experiments: config.cookieExperiments,
    });
    // @ts-ignore
    this.page = page;

    await this.page.goto(url, config.navigationOptions);
  }

  async closePage() {
    if (this.page) {
      await this.page.close();
    }
  }

  getWrapperSelector() {
    return `[data-hook="${this.name}-wrapper"]`;
  }

  async componentReady() {
    await this.page.waitForSelector(this.getWrapperSelector());
  }

  async makeComponentScreenshot() {
    return this.makeScreenshotBySelector(this.getWrapperSelector());
  }

  async setup(url: string, bootstrapConfig?: Partial<IBootstrapConfig>) {
    await this.goto(url, {
      ssr: false,
      ...bootstrapConfig,
    });
  }
}
