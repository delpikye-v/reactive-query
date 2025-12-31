export declare const cache: {
    set<TData>(key: string, data: TData, ttl?: number): void;
    get<TData_1>(key: string): TData_1 | undefined;
    delete(key: string): void;
    clear(): void;
};
