declare module 'version_information' {
  export interface VersionInformation {
    // 17.30.2
    version: string;
    // 17, 30 and 2 respectively
    major: number;
    minor: number;
    patch: number;
  }
}
