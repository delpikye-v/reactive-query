export declare const queryRegistry: {
    register: <TData = any>(cacheKey: string, refetch: () => void, setData?: ((updater: (prev?: TData | undefined) => TData) => void) | undefined, cancel?: () => void, initialCache?: TData | undefined) => void;
    getCache: <TData_1 = any>(cacheKey: string) => TData_1 | undefined;
    setCache: <TData_2 = any>(cacheKey: string, value: TData_2, options?: {
        skip?: boolean;
    }) => void;
    setData: <TData_3 = any>(cacheKey: string, updater: (prev?: TData_3 | undefined) => TData_3, options?: {
        skip?: boolean;
    }) => void;
    cancel: (cacheKey: string) => void;
    invalidate: (cacheKey?: string) => void;
    unregister: (cacheKey: string) => void;
};
