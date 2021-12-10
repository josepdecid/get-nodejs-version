"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const fs_1 = require("fs");
const path_1 = require("path");
// TODO: Temp fix, set type safe for the representation of the package.json
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
exports.default = readPackageJson;
