import { setOutput } from '@actions/core';
import { NodeVersion } from 'version_information';

export function writeOutput(information: NodeVersion) {
  for (const [key, value] of Object.entries(information)) {
    if (value !== null) {
      setOutput(key, value);
    }
  }
}
