import React from 'react';
import Planet from './Planet';
import classnames from 'classnames';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Space from './Space';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './header.module.css';

export default () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <header className={classnames('hero', styles.heroBanner)}>
      <Space />
      <div className={styles.container}>
        <h1 className={classnames('hero__title', styles.heroTitle)}>
          {siteConfig.title}
        </h1>
        <p className={classnames('hero__subtitle', styles.heroSubTitle)}>
          {siteConfig.tagline}
        </p>
        <div className={styles.planetsWrapper}>
          {siteConfig.customFields.flows.map(flow => (
            <Link to={useBaseUrl(flow.to)} key={flow.label}>
              <Planet label={flow.label} />
            </Link>
          ))}
        </div>
        <div className={styles.buttons}>
          <Link
            className={classnames(
              'button button--outline button--secondary button--lg',
              styles.link,
            )}
            to={useBaseUrl('docs/welcome')}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};
