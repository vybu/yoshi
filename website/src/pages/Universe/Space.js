import React from 'react';
import classnames from 'classnames';
import styles from './space.module.css';

export default () => (
  <div className={styles.animationWrapper}>
    <div className={classnames(styles.particle, styles.particle1)}></div>
    <div className={classnames(styles.particle, styles.particle2)}></div>
    <div className={classnames(styles.particle, styles.particle3)}></div>
    <div className={classnames(styles.particle, styles.particle4)}></div>
  </div>
);
