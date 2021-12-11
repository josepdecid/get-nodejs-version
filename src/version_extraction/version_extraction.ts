import { debug } from '@actions/core';
import { PackageJson } from 'package-json-type';
import { NodeVersion } from 'version_information';

const extractVersionInformation = (json: PackageJson): NodeVersion => {
  const version = json.engines.node;
  debug(`NodeJS version from package.json[engines.node]: ${version}`);

  const subVersions = version.split('.');

  return {
    version: version,

    major: parseInt(subVersions[0]),
    minor: parseInt(subVersions[1]),
    patch: parseInt(subVersions[2])
  };
};

export default extractVersionInformation;
