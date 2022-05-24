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
const fs = require("fs-extra");
const path = require("path");
const typescript = require("typescript");
const nodeEval = require("node-eval");
/**
 * A autoloader which manually reads the specified files and uses
 * the "node-eval" library to evaluate the code.
 */
class NodeEvalAutoLoader {
    constructor(tsConfigContent, customOptions) {
        this.tsConfigContent = tsConfigContent;
        this.codeToInject = "";
        this.result = new AutloadResult_1.AutoloadResult();
        this.tsConfig = Object.assign({}, JSON.parse(tsConfigContent), customOptions);
    }
    /**
     * Creates a new instance of the Autloader.
     * The tsconfig is loaded autmatically if a path to it is no given!
     * @param customOptions Optional additional typescript transpilation options
     * @param tsConfigPath Override to the default tsconfig path
     */
    static make(customOptions, tsConfigPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!tsConfigPath) {
                const foundPath = typescript.findConfigFile(process.cwd(), typescript.sys.fileExists);
                if (!foundPath)
                    throw new Error("Could not find the tsconfig file!");
                tsConfigPath = foundPath;
            }
            const content = yield fs.readFile(tsConfigPath);
            return new NodeEvalAutoLoader(content.toString(), customOptions);
        });
    }
    /**
     * Define the custom code that can be injected before the evaluation - Must be valid js code!
     * @param customCode The code that should be injected
     */
    injectCode(customCode) {
        this.codeToInject = customCode;
        return this;
    }
    /**
     * Autoload file from directories
     * @param directories The directories that should be loaded
     */
    fromDirectories(...directories) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.getFilePathsOfDirectories(directories).then((paths) => __awaiter(this, void 0, void 0, function* () {
                for (const path of paths) {
                    yield this.evaluate(path);
                }
            }));
            return this;
        });
    }
    /**
     * Autoload all files in glob.
     * @param pattern The glob pattern
     * @param options Custom glob options
     */
    fromGlob(...patterns) {
        return __awaiter(this, void 0, void 0, function* () {
            yield utils_1.getFilePathsFromGlobs(patterns).then((paths) => __awaiter(this, void 0, void 0, function* () {
                for (const path of paths) {
                    yield this.evaluate(path.toString());
                }
            }));
            return this;
        });
    }
    getResult() {
        return this.result;
    }
    evaluate(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const jsCode = yield this.getJsFromTsFile(filePath);
            if (!jsCode) {
                return;
            }
            /*
             * Sometimes code needs things to run corretly, for example
             * in the typescript world it is very common to use a typescript plugin
             * called tsconfig-paths which lets you use absolute imports based on
             * the tsconfig configuration. This "feature" requires a "hook", which must
             * be injected inorder to make the code run correctly.
             * Here we are injecting this hook
             */
            const codeToEval = `${this.codeToInject}${jsCode}`;
            let evalResult;
            try {
                evalResult = nodeEval(codeToEval, filePath);
            }
            catch (e) {
                throw new Error(`Could not evaluate autoloaded file ${filePath} - ERROR: \n ${e}`);
            }
            for (const exported in evalResult) {
                if (typeof evalResult[exported] === "string") {
                    continue;
                }
                this.result.exports.push(evalResult[exported]);
            }
        });
    }
    getJsFromTsFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure that the path is valid.
            if (!this.shouldEvaluateFile(filePath)) {
                return null;
            }
            // Make sure the filePath is absolute.
            if (!path.isAbsolute(filePath)) {
                filePath = path.join(process.cwd(), filePath);
            }
            const tsCode = yield fs.readFile(filePath);
            return yield this.transpileTypescript(tsCode.toString());
        });
    }
    transpileTypescript(tsCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const transpilationResult = typescript.transpileModule(tsCode, this.tsConfig);
            if (transpilationResult.diagnostics && transpilationResult.diagnostics.length > 0) {
                throw new Error(`Could not compile autoloaded code! - ${transpilationResult.diagnostics}`);
            }
            return transpilationResult.outputText;
        });
    }
    shouldEvaluateFile(filePath) {
        const fileExtension = path.extname(filePath);
        if (fileExtension === "" || fileExtension !== ".ts") {
            return false;
        }
        return true;
    }
}
exports.NodeEvalAutoLoader = NodeEvalAutoLoader;
