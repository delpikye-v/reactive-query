export declare const queryRegistry: {
    register: <T = any>(cacheKey: string, refetch: () => void, setData?: ((updater: (prev?: T | undefined) => T) => void) | undefined, cancel?: () => void, initialCache?: T | undefined) => void;
    getCache: <T_1 = any>(cacheKey: string) => T_1 | undefined;
    setCache: <T_2 = any>(cacheKey: string, value: T_2) => void;
    setData: <T_3 = any>(cacheKey: string, updater: (prev?: T_3 | undefined) => T_3) => void;
    cancel: (cacheKey: string) => void;
    invalidate: (cacheKey?: string) => void;
    unregister: (cacheKey: string) => void;
};
