import { Autoloader } from "../interfaces/Autoloader";
import { AutoloadResult } from "../AutloadResult";
export declare class RequireLoader implements Autoloader {
    protected result: AutoloadResult;
    constructor();
    static make(): Promise<RequireLoader>;
    fromDirectories(...directories: string[]): Promise<this>;
    fromGlob(...patterns: string[]): Promise<this>;
    getResult(): AutoloadResult;
    protected evaluate(path: string): Promise<void>;
}
