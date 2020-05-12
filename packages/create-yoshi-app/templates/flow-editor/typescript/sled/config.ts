import path from 'path';
import kebabCase from 'lodash/kebabCase';
import { viewerUrl } from '../dev/sites';

export const HOME_URL = viewerUrl;

// type from `jest-image-snapshot`'s `MatchImageSnapshotOptions['customSnapshotIdentifier']`
// (copied because it's types are unsupported by sled-test-runner)
const customSnapshotIdentifier: (parameters: {
  testPath: string;
  currentTestName: string;
  counter: number;
  defaultIdentifier: string;
}) => string = ({ testPath, currentTestName }) =>
  // result is the same as `defaultIdentifier`, but with overwritten `counter`
  // (because of its "drift" caused by `jest.retryTimes`)
  // https://github.com/americanexpress/jest-image-snapshot/blob/c6a0bf6e399277ee8fce71d32eeaf4abaa2e8d26/src/index.js#L94
  kebabCase(`${path.basename(testPath)}-${currentTestName}`);

export const SNAPSHOTS_CONFIG_RETRY = {
  customSnapshotIdentifier,
  includeAA: true,
  threshold: 0.1,
};
