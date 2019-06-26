import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as axios from 'axios';
import { initI18n, I18nextProvider } from '@wix/wix-i18n-config';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import App from './components/App';
import { create as createFedopsLogger } from '@wix/fedops-logger';

const baseURL = window.__BASEURL__;

wixAxiosConfig(axios, { baseURL });

const fedopsLogger = createFedopsLogger('{%projectName%}');
const i18n = initI18n({
  locale:window.__LOCALE__,
  messages: JSON.parse(window.__MESSAGES__)
})
// Move the following `appLoaded()` call to the point where your app has fully loaded.
// See https://github.com/wix-private/fed-infra/blob/master/fedops/fedops-logger/README.md
fedopsLogger.appLoaded();

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>,
  document.getElementById('root'),
);
