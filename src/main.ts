import readPackageJson from './input_reader/input_reader';
import { writeOutput } from './output_writer';
import { extractVersionInformation } from './version_extraction';

const run = (): void => {
  const packageJson = readPackageJson();
  const information = extractVersionInformation(packageJson);
  writeOutput(information);
};

run();
