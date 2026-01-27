export declare function getPendingQuery<T>(key: string): Promise<T> | undefined;
export declare function setPendingQuery<T>(key: string, promise: Promise<T>): void;
export declare function clearPendingQuery(key: string): void;
