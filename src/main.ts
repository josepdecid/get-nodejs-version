import { getInput, setFailed, setOutput, debug } from '@actions/core';
import * as fs from 'fs';
import { join } from 'path';

type IPackageJSON = {
  [id: string | 'engines']: { [id: string | 'nodes']: string };
};

// TODO: Temp fix, set type safe for the representation of the package.json
function readPackageJson(path: string): IPackageJSON {
  const packagePath = join(path, 'package.json');

  if (!fs.existsSync(packagePath)) {
    setFailed('Unable to find `package.json` file...');
  } else {
    debug(`Reading "package.json" file from "${path}".`);
  }

  let packageJson;
  try {
    const packageJsonRaw = fs.readFileSync(packagePath).toString();

    packageJson = JSON.parse(packageJsonRaw);
  } catch (error: any) {
    setFailed(error.message);
  }

  return packageJson;
}

function extractVersionDetails(version: string): { [id: string]: string } {
  debug(`Node version from package.engines.node: ${version}`);

  const subVersions = version.split('.');

  return {
    version: version,
    major: subVersions[0],
    minor: subVersions[1],
    patch: subVersions[2]
  };
}

function run(): void {
  const path = getInput('path');
  const packageJson = readPackageJson(path);

  const nodeVersion = packageJson.engines.node;
  const details = extractVersionDetails(nodeVersion);

  for (const [key, value] of Object.entries(details)) {
    if (value !== null) {
      setOutput(key, value);
    }
  }
}

run();
