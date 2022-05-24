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
const utils = require("../utils");
class RequireLoader {
    constructor() {
        this.result = new AutloadResult_1.AutoloadResult();
    }
    static make() {
        return __awaiter(this, void 0, void 0, function* () {
            return new RequireLoader();
        });
    }
    fromDirectories(...directories) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils.getFilePathsOfDirectories(directories).then((paths) => __awaiter(this, void 0, void 0, function* () {
                for (const path of paths) {
                    yield this.evaluate(path);
                }
            }));
            return this;
        });
    }
    fromGlob(...patterns) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils.getFilePathsFromGlobs(patterns).then((paths) => __awaiter(this, void 0, void 0, function* () {
                for (const path of paths) {
                    yield this.evaluate(path);
                }
            }));
            return this;
        });
    }
    getResult() {
        return this.result;
    }
    evaluate(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const exported = require(path);
            for (const mod in exported) {
                this.result.exports.push(exported[mod]);
            }
        });
    }
}
exports.RequireLoader = RequireLoader;
