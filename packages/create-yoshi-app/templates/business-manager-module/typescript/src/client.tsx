import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { initI18n, I18nextProvider } from '@wix/wix-i18n-config';
import { ModuleRegistry } from 'react-module-container';
import { create } from '@wix/fedops-logger';
import { wixAxiosConfig } from '@wix/wix-axios-config';
import { COMPONENT_NAME, IBMModuleParams } from './config';
import App from './components/App';

wixAxiosConfig(axios, {
  baseURL: '/',
});

const notifyStartLoading = () => {
  ModuleRegistry.notifyListeners(
    'businessManager.viewStartLoading',
    COMPONENT_NAME,
  );
};
const notifyDoneLoading = () => {
  ModuleRegistry.notifyListeners(
    'businessManager.viewFinishedLoading',
    COMPONENT_NAME,
  );
};

export default class AppContainer extends React.Component<IBMModuleParams> {
  static propTypes = {
    locale: PropTypes.string,
  };

  constructor(props) {
    super(props);
    notifyStartLoading();
  }

  componentDidMount() {
    // Note: you might want to invoke notify after initial data fetch (to keep BM loader during fetch)
    const fedopsLogger = create(COMPONENT_NAME);
    fedopsLogger.appLoaded();
    notifyDoneLoading();
  }

  render() {
    const i18n = initI18n({
      locale: this.props.locale,
      asyncMessagesLoader: locale =>
        import(`./assets/locale/messages_${locale}.json`),
    });
    return (
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    );
  }
}
