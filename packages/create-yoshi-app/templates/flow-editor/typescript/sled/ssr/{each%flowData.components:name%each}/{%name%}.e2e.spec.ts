/// <reference types="sled-test-runner" />
import { HOME_URL, SNAPSHOTS_CONFIG_RETRY } from '../../config';
import { appName } from '../../../.application.json';
import { ViewerE2EDriver } from './{%name%}.e2e.driver';

describe('{%name%}', () => {
  let driver: ViewerE2EDriver;

  beforeEach(async () => {
    driver = new ViewerE2EDriver();
    // You can remove this condition after viewerUrl will be updated to real viewer website.
    const homeUrl = HOME_URL.includes('editor-flow-dev.com')
      ? HOME_URL + `&compName={%name%}`
      : HOME_URL;
    await driver.setup(homeUrl, { ssr: true });
    await driver.componentReady();
  });

  afterEach(async () => {
    await driver.closePage();
  });

  it('should render a widget with needed content', async () => {
    const appTitle = await driver.getAppTitle();
    expect(appTitle).toContain(appName);
  });

  it('should render a widget with SSR', async () => {
    const screenshot = await driver.makeComponentScreenshot();

    expect(screenshot).toMatchImageSnapshot(SNAPSHOTS_CONFIG_RETRY);
  });
});
