export declare const queryRegistry: {
    register: <T = any>(cacheKey: string, refetch: () => void, setData?: ((updater: (prev?: T | undefined) => T) => void) | undefined, cancel?: () => void) => void;
    setData: <T_1 = any>(cacheKey: string, updater: (prev?: T_1 | undefined) => T_1) => void;
    cancel: (cacheKey: string) => void;
    invalidate: (cacheKey?: string) => void;
    unregister: (cacheKey: string) => void;
};
