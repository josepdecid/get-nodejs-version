import { describe, it, expect, beforeAll } from '@jest/globals';
import { extractVersionInformation } from '.';

describe('When extracting the information from a explicit version', () => {
  const rawVersion = '17.18.9';
  let versionInfo: any;

  beforeAll(() => {
    versionInfo = extractVersionInformation({
      engines: {
        node: rawVersion
      }
    });
  });

  it('contains a key for the version', () => {
    expect(versionInfo).toHaveProperty('version');
  });

  it('contains a key for the major, minor and patch', () => {
    expect(versionInfo).toHaveProperty('major');
    expect(versionInfo).toHaveProperty('minor');
    expect(versionInfo).toHaveProperty('patch');
  });

  it('should return the same value as the input', () => {
    expect(versionInfo.version).toEqual('17.18.9');
  });

  it('should return the first part as the major', () => {
    expect(versionInfo.major).toEqual(17);
  });

  it('should return the middle part as the minor', () => {
    expect(versionInfo.minor).toEqual(18);
  });

  it('should return the last part as the patch', () => {
    expect(versionInfo.patch).toEqual(9);
  });
});
