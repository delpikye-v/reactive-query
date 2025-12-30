export declare const cache: {
    get: <T>(key: string) => T | undefined;
    set: <T_1>(key: string, data: T_1) => void;
    delete: (key: string) => void;
    clear: () => void;
};
