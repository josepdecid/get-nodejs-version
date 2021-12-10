import { debug } from '@actions/core';
import { IPackageJSON } from '../main';

const extractVersionInformation = (
  packageJson: IPackageJSON
): { [id: string]: string } => {
  const version = packageJson.engines.node;
  debug(`Node version from package.engines.node: ${version}`);

  const subVersions = version.split('.');

  return {
    version: version,

    major: subVersions[0],
    minor: subVersions[1],
    patch: subVersions[2]
  };
};

export default extractVersionInformation;
