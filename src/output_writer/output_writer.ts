import { setOutput } from '@actions/core';

const writeOutput = (information: { [id: string]: string }) => {
  for (const [key, value] of Object.entries(information)) {
    if (value !== null) {
      setOutput(key, value);
    }
  }
};

export default writeOutput;
