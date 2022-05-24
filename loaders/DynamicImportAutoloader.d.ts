import { Autoloader } from "../interfaces/Autoloader";
import { AutoloadResult } from "../AutloadResult";
/**
 * A autoloader which uses the "import()" function to load.
 * ! To use this loader you may have to use Typescript 2.9 or higher.
 */
export declare class DynamicImportAutoloader implements Autoloader {
    protected result: AutoloadResult;
    constructor();
    /**
     * Creates a new instance of the DynamicImportAutoloader.
     * * This method exists just for compatibility with other loaders.
     * * It does not do anything more that create a instance of the autoloader.
     */
    static make(): Promise<DynamicImportAutoloader>;
    /**
     * Autoloads all files in the specified directories.
     * @param directories The direcories to load from
     */
    fromDirectories(...directories: string[]): Promise<this>;
    /**
     * Autoloads all files from the these patterns.
     * @param patterns The patterns to search with
     */
    fromGlob(...patterns: string[]): Promise<this>;
    /**
     * Gets the Result of the autoload.
     */
    getResult(): AutoloadResult;
    /**
     * Processes all files in the array.
     * @param paths Evaluates all paths in a array
     */
    protected evaluatePaths(paths: string[]): void;
    /**
     * Evaluates and processes the file.
     * @param path The path to evaluate
     */
    protected evaluate(path: string): void;
}
