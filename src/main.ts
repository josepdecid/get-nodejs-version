import { readPackageJson, writeOutput } from './io_helpers';
import { extractVersionInformation } from './version_extraction';

const run = (): void => {
  const packageJson = readPackageJson();
  const information = extractVersionInformation(packageJson);
  writeOutput(information);
};

run();
