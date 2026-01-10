export type FetchQueryOptions = RequestInit & {
    autoFetch?: boolean;
    cacheKey?: string;
    cacheTime?: number;
    staleTime?: number;
    baseURL?: string;
    headers?: Record<string, string>;
    isGraphQL?: boolean;
    query?: string;
    variables?: Record<string, any>;
    operationName?: string;
};
export interface GlobalConfig {
    baseURL?: string;
    headers?: Record<string, string>;
    retry?: number;
    retryDelay?: number;
    timeout?: number;
    interceptors?: {
        onRequest?: (url: string, options: FetchQueryOptions) => FetchQueryOptions;
        onResponse?: <TData>(data: TData) => TData;
        onError?: (err: any) => void;
    };
}
export declare function setGlobalConfig(newConfig: GlobalConfig): void;
export declare function getGlobalConfig(): GlobalConfig;
