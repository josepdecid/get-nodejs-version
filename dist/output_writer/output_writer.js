"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const writeOutput = (information) => {
    for (const [key, value] of Object.entries(information)) {
        if (value !== null) {
            (0, core_1.setOutput)(key, value);
        }
    }
};
exports.default = writeOutput;
