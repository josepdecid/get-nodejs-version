import { describe, it, expect, beforeAll } from '@jest/globals';
import {
  extractVersionInformation,
  cleanVersionData
} from './version_extraction';

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

describe('When extracting the information from a noisy versions', () => {
  it('returns a clean version if there are noisy spaces and version prefixes', () => {
    const cleanedVersion = cleanVersionData(' v17.18.19 ');
    expect(cleanedVersion).toBe('17.18.19');
  });

  it('returns a coerced version if there is a tag or simple version', () => {
    const cleanedVersion = cleanVersionData('v17');
    expect(cleanedVersion).toBe('17.0.0');
  });

  it('returns a coerced version if there are more terms than major minor and patch', () => {
    const cleanedVersion = cleanVersionData('17.18.19.20-rc11');
    expect(cleanedVersion).toBe('17.18.19');
  });
});

describe('When extracting the information from a range of versions', () => {
  it('returns the minimum version that matches a lower-bounded range', () => {
    const cleanedVersion = cleanVersionData('>=17.0.5');
    expect(cleanedVersion).toBe('17.0.5');
  });

  it('returns the minimum version that matches a lower and upper bounded range', () => {
    const cleanedVersion = cleanVersionData('>=17.0.5 <17.0.10');
    expect(cleanedVersion).toBe('17.0.5');
  });
});

describe('When extracting the information from a non supported version', () => {
  it('returns a null value', () => {
    const cleanedVersion = cleanVersionData('not-valid-version');
    expect(cleanedVersion).toBeNull();
  });
});
