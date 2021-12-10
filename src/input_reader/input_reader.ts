import { debug, getInput, setFailed } from '@actions/core';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { IPackageJSON } from '../main';

// TODO: Temp fix, set type safe for the representation of the package.json
function readPackageJson(): IPackageJSON {
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

export default readPackageJson;
