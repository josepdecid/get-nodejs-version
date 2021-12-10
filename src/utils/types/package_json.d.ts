declare module 'package-json-type' {
  interface PackageEngines {
    node: string;
    // TODO: Add npm
  }

  export interface PackageJson {
    // Other priperties are not required (yet).
    engines: PackageEngines;
  }
}
