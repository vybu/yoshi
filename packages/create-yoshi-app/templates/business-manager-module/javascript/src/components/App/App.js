import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '@wix/wix-i18n-config';
import s from './App.scss';

class App extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };

  render() {
    const { t } = this.props;
    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2 data-hook="app-title">{t('app.title')}</h2>
        </div>
        <p className={s.intro}>
          {t('app.intro', {
            introUrl:
              'https://github.com/wix-private/business-manager-test-app/blob/master/docs/step-by-step.md',
          })}
        </p>
      </div>
    );
  }
}

export default withTranslation()(App);
