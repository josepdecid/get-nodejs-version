"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io_helpers_1 = require("./io_helpers");
const version_extraction_1 = require("./version_extraction");
const run = () => {
    const packageJson = (0, io_helpers_1.readPackageJson)();
    const information = (0, version_extraction_1.extractVersionInformation)(packageJson);
    (0, io_helpers_1.writeOutput)(information);
};
run();
