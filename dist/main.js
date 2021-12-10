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
const core_1 = require("@actions/core");
const fs = __importStar(require("fs"));
const path_1 = require("path");
// TODO: Temp fix, set type safe for the representation of the package.json
function readPackageJson(path) {
    const packagePath = (0, path_1.join)(path, 'package.json');
    if (!fs.existsSync(packagePath)) {
        (0, core_1.setFailed)('Unable to find `package.json` file...');
    }
    else {
        (0, core_1.debug)(`Reading "package.json" file from "${path}".`);
    }
    let packageJson;
    try {
        const packageJsonRaw = fs.readFileSync(packagePath).toString();
        packageJson = JSON.parse(packageJsonRaw);
    }
    catch (error) {
        (0, core_1.setFailed)(error.message);
    }
    return packageJson;
}
function extractVersionDetails(version) {
    (0, core_1.debug)(`Node version from package.engines.node: ${version}`);
    const subVersions = version.split('.');
    return {
        version: version,
        major: subVersions[0],
        minor: subVersions[1],
        patch: subVersions[2]
    };
}
function run() {
    const path = (0, core_1.getInput)('path');
    const packageJson = readPackageJson(path);
    const nodeVersion = packageJson.engines.node;
    const details = extractVersionDetails(nodeVersion);
    for (const [key, value] of Object.entries(details)) {
        if (value !== null) {
            (0, core_1.setOutput)(key, value);
        }
    }
}
run();
