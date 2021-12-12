import { debug } from '@actions/core';
import * as semver from 'semver';
import { PackageJson } from 'package-json-type';
import { NodeVersion } from 'version_information';
import { exit } from 'process';

export const cleanVersionData = (version: string): string | null => {
  let validated: string | null = version;

  // Check if the version is valid
  validated = semver.valid(version);
  if (validated !== null) return validated;

  // Check if the version has a range
  if (version.includes('>') || version.includes('<')) {
    validated = semver.valid(semver.minVersion(version));
    if (validated !== null) return validated;
  }

  // Try to clean the version
  validated = semver.valid(semver.clean(version));
  if (validated !== null) return validated;

  // Try to coerce the version
  validated = semver.valid(semver.coerce(version));
  if (validated !== null) return validated;

  return null;
};

export const extractVersionInformation = (json: PackageJson): NodeVersion => {
  const version = cleanVersionData(json.engines.node);
  if (version === null) {
    debug('Unable to parse the NodeJS version.');
    exit(1);
  }

  debug(`NodeJS version from package.json > engines > node: ${version}`);
  const subVersions = version.split('.');

  return {
    version: version,
    major: parseInt(subVersions[0]),
    minor: parseInt(subVersions[1]),
    patch: parseInt(subVersions[2])
  };
};
