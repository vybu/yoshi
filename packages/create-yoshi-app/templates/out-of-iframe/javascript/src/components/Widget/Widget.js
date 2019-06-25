import React from 'react';
import {
  I18nextProvider,
  withTranslation,
  initI18n,
} from '@wix/wix-i18n-config';
import {
  ExperimentsProvider,
  withExperiments,
} from '@wix/wix-experiments-react';
import { TPAComponentsProvider } from 'wix-ui-tpa/TPAComponentsConfig';
import { Button } from 'wix-ui-tpa/Button';
import styles from './Widget.st.css';

export default class WidgetRoot extends React.Component {
  render() {
    const { name, locale, experiments, mobile } = this.props;

    const i18n = initI18n({
      locale,
      asyncMessagesLoader: language =>
        import(`../../assets/locales/messages_${language}.json`),
    });

    return (
      <I18nextProvider i18n={i18n}>
        <ExperimentsProvider options={{ experiments }}>
          <TPAComponentsProvider value={{ mobile }}>
            <Widget name={name} />
          </TPAComponentsProvider>
        </ExperimentsProvider>
      </I18nextProvider>
    );
  }
}

export const Widget = withExperiments(
  withTranslation()(({ name, t, ...rest }) => {
    return (
      <div {...styles('root', {}, rest)}>
        <div className={styles.header}>
          <h2>{t('app.hello', { name })}!</h2>
        </div>
        <Button className={styles.mainButton}>click me</Button>
      </div>
    );
  }),
);
