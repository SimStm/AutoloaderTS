"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("fast-glob");
const path = require("path");
const fs = require("fs");
function prepareGlobPatterns(patterns) {
    return patterns.map(pattern => pattern.replace("\\", "/"));
}
exports.prepareGlobPatterns = prepareGlobPatterns;
function getFilePathsFromGlobs(patterns) {
    return __awaiter(this, void 0, void 0, function* () {
        patterns = prepareGlobPatterns(patterns);
        const files = [];
        for (const pattern of patterns) {
            yield glob(pattern).then(globFiles => {
                for (const file of globFiles) {
                    const filePath = formatPath(process.cwd(), file.toString());
                    files.push(filePath);
                }
            });
        }
        return files;
    });
}
exports.getFilePathsFromGlobs = getFilePathsFromGlobs;
function getFilePathsOfDirectories(directories) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = [];
        for (const directory of directories) {
            const directoryFiles = yield fs.promises.readdir(directory);
            for (const file of directoryFiles) {
                const filePath = formatPath(directory, file);
                files.push(filePath);
            }
        }
        return files;
    });
}
exports.getFilePathsOfDirectories = getFilePathsOfDirectories;
function formatPath(directory, file) {
    return path.resolve(directory, file);
}
exports.formatPath = formatPath;
