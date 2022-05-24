export declare function prepareGlobPatterns(patterns: string[]): string[];
export declare function getFilePathsFromGlobs(patterns: string[]): Promise<string[]>;
export declare function getFilePathsOfDirectories(directories: string[]): Promise<string[]>;
export declare function formatPath(directory: string, file: string): string;
