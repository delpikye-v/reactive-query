import { fetchQuery } from "./fetchQuery";
export declare const queryClient: {
    fetchQuery: typeof fetchQuery;
    getQueryData<T>(key: string): T | undefined;
    setQueryData<T_1>(key: string, updater: (prev?: T_1 | undefined) => T_1): void;
    invalidateQueries(key?: string): void;
    ensureQueryData<T_2>(endpoint: string, options: any): Promise<T_2>;
};
