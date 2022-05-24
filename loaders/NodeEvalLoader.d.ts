import { Autoloader } from "../interfaces/Autoloader";
import { CodeInjector } from "../interfaces/CodeInjector";
import { AutoloadResult } from "../AutloadResult";
import * as typescript from "typescript";
/**
 * A autoloader which manually reads the specified files and uses
 * the "node-eval" library to evaluate the code.
 */
export declare class NodeEvalAutoLoader implements Autoloader, CodeInjector {
    private tsConfigContent;
    protected result: AutoloadResult;
    protected tsConfig: typescript.TranspileOptions;
    protected codeToInject: string;
    protected constructor(tsConfigContent: string, customOptions?: typescript.TranspileOptions);
    /**
     * Creates a new instance of the Autloader.
     * The tsconfig is loaded autmatically if a path to it is no given!
     * @param customOptions Optional additional typescript transpilation options
     * @param tsConfigPath Override to the default tsconfig path
     */
    static make(customOptions?: typescript.TranspileOptions, tsConfigPath?: string): Promise<NodeEvalAutoLoader>;
    /**
     * Define the custom code that can be injected before the evaluation - Must be valid js code!
     * @param customCode The code that should be injected
     */
    injectCode(customCode: string): this;
    /**
     * Autoload file from directories
     * @param directories The directories that should be loaded
     */
    fromDirectories(...directories: string[]): Promise<this>;
    /**
     * Autoload all files in glob.
     * @param pattern The glob pattern
     * @param options Custom glob options
     */
    fromGlob(...patterns: string[]): Promise<this>;
    getResult(): AutoloadResult;
    protected evaluate(filePath: string): Promise<void>;
    protected getJsFromTsFile(filePath: string): Promise<string | null>;
    protected transpileTypescript(tsCode: string): Promise<string>;
    protected shouldEvaluateFile(filePath: string): boolean;
}
