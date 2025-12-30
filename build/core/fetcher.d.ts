type QueryOptions = RequestInit & {
    cacheKey?: string;
};
export declare function fetcher<T>(url: string, options?: QueryOptions): Promise<T>;
export {};
