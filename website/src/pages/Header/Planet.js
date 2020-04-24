import React from 'react';
import styles from './planet.module.css';

const getRandomItem = list => list[Math.floor(Math.random() * list.length)];

const COLORS = [
  '#FFA19E',
  '#FFD594',
  '#B3F3ED',
  '#55E5AC',
  '#FF6D89',
  '#BDBDFF',
  '#38216B',
];
const SIZES = [80, 90, 100, 110, 120, 130, 140];

const getRandomColor = () => getRandomItem(COLORS);
const getRandomSize = () => getRandomItem(SIZES);
const getAnimationDuration = size => `${size / 20}s`;

export default ({ label }) => {
  const size = getRandomSize();

  return (
    <div className={styles.planetResizer}>
      <div
        className={styles.planetMover}
        style={{ animationDuration: getAnimationDuration(size) }}
      >
        <div
          className={styles.planet}
          style={{
            backgroundColor: getRandomColor(),
            width: size,
            height: size,
          }}
        >
          <div className={styles.hover} />
        </div>
        <span className={styles.planetLabel}>{label}</span>
      </div>
    </div>
  );
};
