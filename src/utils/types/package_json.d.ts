declare module 'package-json-type' {
  interface PackageEngines {
    node: string;
  }

  export interface PackageJson {
    // Other properties are not required (yet).
    engines: PackageEngines;
  }
}
