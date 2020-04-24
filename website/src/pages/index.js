/* eslint-disable import/no-unresolved */
import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Header from './Header';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Zero config</>,
    imageUrl: 'img/rocket.png',
    description: <>No configuration required, just create and start working</>,
  },
  {
    title: <>Full TypeScript Support</>,
    imageUrl: 'img/ts.png',
    description: (
      <>
        Just choose TypeScript when generating a project, or gradually migrate
      </>
    ),
  },
  {
    title: <>JustWorks™</>,
    imageUrl: 'img/lotusman.png',
    description: (
      <>Supports multiple usecases while being stable and reliable</>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  return (
    <Layout
      title={'Toolkit for building applications @ Wix'}
      description="Toolkit for building applications @ Wix"
    >
      <Header />
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
