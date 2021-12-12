"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractVersionInformation = exports.cleanVersionData = void 0;
const core_1 = require("@actions/core");
const semver = __importStar(require("semver"));
const process_1 = require("process");
const cleanVersionData = (version) => {
    let validated = version;
    // Check if the version is valid
    validated = semver.valid(version);
    if (validated !== null)
        return validated;
    // Check if the version has a range
    if (version.includes('>') || version.includes('<')) {
        validated = semver.valid(semver.minVersion(version));
        if (validated !== null)
            return validated;
    }
    // Try to clean the version
    validated = semver.valid(semver.clean(version));
    if (validated !== null)
        return validated;
    // Try to coerce the version
    validated = semver.valid(semver.coerce(version));
    if (validated !== null)
        return validated;
    return null;
};
exports.cleanVersionData = cleanVersionData;
const extractVersionInformation = (json) => {
    const version = (0, exports.cleanVersionData)(json.engines.node);
    if (version === null) {
        (0, core_1.debug)('Unable to parse the NodeJS version.');
        (0, process_1.exit)(1);
    }
    (0, core_1.debug)(`NodeJS version from package.json > engines > node: ${version}`);
    const subVersions = version.split('.');
    return {
        version: version,
        major: parseInt(subVersions[0]),
        minor: parseInt(subVersions[1]),
        patch: parseInt(subVersions[2])
    };
};
exports.extractVersionInformation = extractVersionInformation;
