"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeEvalLoader_1 = require("./loaders/NodeEvalLoader");
exports.NodeEvalAutoLoader = NodeEvalLoader_1.NodeEvalAutoLoader;
const DynamicImportAutoloader_1 = require("./loaders/DynamicImportAutoloader");
exports.DynamicImportAutoloader = DynamicImportAutoloader_1.DynamicImportAutoloader;
const RequireLoader_1 = require("./loaders/RequireLoader");
exports.RequireLoader = RequireLoader_1.RequireLoader;
var AutloadResult_1 = require("./AutloadResult");
exports.AutoloadResult = AutloadResult_1.AutoloadResult;
class Autoloader {
}
Autoloader.nodeEval = NodeEvalLoader_1.NodeEvalAutoLoader.make;
Autoloader.dynamicImport = DynamicImportAutoloader_1.DynamicImportAutoloader.make;
Autoloader.requireLoader = RequireLoader_1.RequireLoader.make;
exports.Autoloader = Autoloader;
