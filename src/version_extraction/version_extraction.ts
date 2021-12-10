import { debug } from '@actions/core';
import { PackageJson } from 'package-json-type';
import { VersionInformation } from 'version_information';

const extractVersionInformation = (
  packageJson: PackageJson
): VersionInformation => {
  const version = packageJson.engines.node;

  debug(`Node version from package.engines.node: ${version}`);

  const subVersions = version.split('.');

  return {
    version: version,

    major: parseInt(subVersions[0]),
    minor: parseInt(subVersions[1]),
    patch: parseInt(subVersions[2])
  };
};

export default extractVersionInformation;
