import * as React from 'react';
import { I18nextProvider, withTranslation, initI18n } from '@wix/wix-i18n-config';
import {
  ExperimentsProvider,
  withExperiments,
} from '@wix/wix-experiments-react';
import { Button } from 'wix-ui-tpa/Button';
import styles from './Widget.st.css';

// import { IHostProps } from '@wix/native-components-infra/dist/src/types/types';
import { ExperimentsBag } from '@wix/wix-experiments';

interface IWidgetRootProps {
  name: string;
  locale: string;
  experiments: ExperimentsBag;
  host?: any;
}

export default class WidgetRoot extends React.Component<IWidgetRootProps, {}> {
  render() {
    const { name, locale, experiments } = this.props;

    const i18n = initI18n({
      locale,
      asyncMessagesLoader: (language: string) => import(`../../assets/locales/messages_${language}.json`)
    });

    return (
      <I18nextProvider i18n={i18n}>
        <ExperimentsProvider options={{ experiments }}>
          <Widget name={name} />
        </ExperimentsProvider>
      </I18nextProvider>
    );
  }
}

export const Widget = withExperiments<any>(
  withTranslation()(({ name, t, ...rest }) => {
    return (
      <div {...styles('root', {}, rest)}>
        <div className={styles.header}>
          <h2>
            {t('app.hello', {name})}!
          </h2>
        </div>
        <Button className={styles.mainButton}>click me</Button>
      </div>
    );
  }),
);
