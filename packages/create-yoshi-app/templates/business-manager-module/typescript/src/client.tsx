import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { notifyViewStartLoading } from '@wix/business-manager-api';
import { COMPONENT_NAME, IBMModuleParams } from './config';
import i18n from './i18n';
import App from './components/App';

export default class AppContainer extends React.Component<IBMModuleParams> {
  constructor(props: IBMModuleParams) {
    super(props);
    notifyViewStartLoading(COMPONENT_NAME);
  }

  render() {
    const { locale, config } = this.props;
    const baseUrl = config.topology.staticsUrl;
    return (
      <I18nextProvider i18n={i18n(locale, baseUrl)}>
        <App />
      </I18nextProvider>
    );
  }
}
