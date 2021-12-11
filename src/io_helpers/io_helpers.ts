import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { PackageJson } from 'package-json-type';
import { NodeVersion } from 'version_information';
import { debug, getInput, setFailed, setOutput } from '@actions/core';

export function readPackageJson(): PackageJson {
  const path = getInput('path');
  const packagePath = join(path, 'package.json');

  if (!existsSync(packagePath)) {
    setFailed('Unable to find `package.json` file...');
  } else {
    debug(`Reading "package.json" file from "${path || '.'}".`);
  }

  let packageJson;
  try {
    const packageJsonRaw = readFileSync(packagePath).toString();
    packageJson = JSON.parse(packageJsonRaw);
  } catch (error: any) {
    setFailed(error.message);
  }

  return packageJson;
}

export function writeOutput(information: NodeVersion) {
  for (const [key, value] of Object.entries(information)) {
    if (value !== null) {
      setOutput(key, value);
    }
  }
}
