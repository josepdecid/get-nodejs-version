import { setOutput } from '@actions/core';
import { VersionInformation } from 'version_information';

const writeOutput = (information: VersionInformation) => {
  for (const [key, value] of Object.entries(information)) {
    if (value !== null) {
      setOutput(key, value);
    }
  }
};

export default writeOutput;
