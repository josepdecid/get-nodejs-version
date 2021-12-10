"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_reader_1 = __importDefault(require("./input_reader/input_reader"));
const output_writer_1 = require("./output_writer");
const version_extraction_1 = require("./version_extraction");
const run = () => {
    const packageJson = (0, input_reader_1.default)();
    const information = (0, version_extraction_1.extractVersionInformation)(packageJson);
    (0, output_writer_1.writeOutput)(information);
};
run();
