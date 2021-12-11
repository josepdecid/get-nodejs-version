declare module 'version_information' {
  export interface NodeVersion {
    // 17.30.2
    version: string;
    // 17, 30 and 2 respectively
    major: number;
    minor: number;
    patch: number;
  }
}
