import { PackageGraphNode } from './load-package-graph';

// TODO - thunderbolt-elements should be removed once editor-elements-library is source of truth for comps
export const isThunderboltElementModule = (pkg: PackageGraphNode) =>
  pkg.name === 'thunderbolt-elements' || pkg.name === 'editor-elements-library';

export const isThunderboltAppModule = (pkg: PackageGraphNode) =>
  pkg.name === '@wix/thunderbolt-app';

export const isSiteAssetsModule = (pkg: PackageGraphNode) =>
  pkg.name === 'thunderbolt-becky' || pkg.name === '@wix/thunderbolt-becky';
