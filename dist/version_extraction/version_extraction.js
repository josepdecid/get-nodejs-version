"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const extractVersionInformation = (packageJson) => {
    const version = packageJson.engines.node;
    (0, core_1.debug)(`Node version from package.engines.node: ${version}`);
    const subVersions = version.split('.');
    return {
        version: version,
        major: subVersions[0],
        minor: subVersions[1],
        patch: subVersions[2]
    };
};
exports.default = extractVersionInformation;
