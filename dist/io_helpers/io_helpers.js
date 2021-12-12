"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutput = exports.readPackageJson = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const core_1 = require("@actions/core");
function readPackageJson() {
    const path = (0, core_1.getInput)('path');
    const packagePath = (0, path_1.join)(path, 'package.json');
    if (!(0, fs_1.existsSync)(packagePath)) {
        (0, core_1.setFailed)('Unable to find `package.json` file...');
    }
    else {
        (0, core_1.debug)(`Reading "package.json" file from "${path || '.'}".`);
    }
    let packageJson;
    try {
        const packageJsonRaw = (0, fs_1.readFileSync)(packagePath).toString();
        packageJson = JSON.parse(packageJsonRaw);
    }
    catch (error) {
        (0, core_1.setFailed)(error.message);
    }
    return packageJson;
}
exports.readPackageJson = readPackageJson;
function writeOutput(information) {
    for (const [key, value] of Object.entries(information)) {
        if (value !== null) {
            (0, core_1.setOutput)(key, value);
        }
    }
}
exports.writeOutput = writeOutput;
