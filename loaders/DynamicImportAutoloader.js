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
const AutloadResult_1 = require("../AutloadResult");
const utils_1 = require("../utils");
/**
 * A autoloader which uses the "import()" function to load.
 * ! To use this loader you may have to use Typescript 2.9 or higher.
 */
class DynamicImportAutoloader {
    constructor() {
        this.result = new AutloadResult_1.AutoloadResult();
    }
    /**
     * Creates a new instance of the DynamicImportAutoloader.
     * * This method exists just for compatibility with other loaders.
     * * It does not do anything more that create a instance of the autoloader.
     */
    static make() {
        return __awaiter(this, void 0, void 0, function* () {
            return new DynamicImportAutoloader();
        });
    }
    /**
     * Autoloads all files in the specified directories.
     * @param directories The direcories to load from
     */
    fromDirectories(...directories) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.getFilePathsOfDirectories(directories).then(paths => {
                this.evaluatePaths(paths);
            });
            return this;
        });
    }
    /**
     * Autoloads all files from the these patterns.
     * @param patterns The patterns to search with
     */
    fromGlob(...patterns) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.getFilePathsFromGlobs(patterns).then(paths => {
                this.evaluatePaths(paths);
            });
            return this;
        });
    }
    /**
     * Gets the Result of the autoload.
     */
    getResult() {
        return this.result;
    }
    /**
     * Processes all files in the array.
     * @param paths Evaluates all paths in a array
     */
    evaluatePaths(paths) {
        for (const path of paths) {
            this.evaluate(path);
        }
    }
    /**
     * Evaluates and processes the file.
     * @param path The path to evaluate
     */
    evaluate(path) {
        Promise.resolve().then(() => require(path)).then(mod => {
            for (const exported in mod) {
                this.result.exports.push(mod[exported]);
            }
        });
    }
}
exports.DynamicImportAutoloader = DynamicImportAutoloader;
