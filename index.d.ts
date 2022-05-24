import { NodeEvalAutoLoader } from "./loaders/NodeEvalLoader";
import { DynamicImportAutoloader } from "./loaders/DynamicImportAutoloader";
import { RequireLoader } from "./loaders/RequireLoader";
export { AutoloadResult } from "./AutloadResult";
export { DynamicImportAutoloader, NodeEvalAutoLoader, RequireLoader };
export { Autoloader as IAutoloader } from "./interfaces/Autoloader";
export declare class Autoloader {
    static nodeEval: typeof NodeEvalAutoLoader.make;
    static dynamicImport: typeof DynamicImportAutoloader.make;
    static requireLoader: typeof RequireLoader.make;
}
