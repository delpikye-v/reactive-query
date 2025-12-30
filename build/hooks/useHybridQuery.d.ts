/// <reference types="react" />
export interface HybridQueryOptions<T> {
    cacheKey?: string;
    optimisticUpdate?: (prevData: T | null, newData: T) => T;
    staleTime?: number;
    subscriptionUrl?: string;
    retry?: number;
    retryDelay?: number;
    headers?: Record<string, string>;
    timeout?: number;
}
export interface HybridQueryParams<T> {
    query?: string;
    variables?: Record<string, any>;
    options?: HybridQueryOptions<T>;
}
export declare function useHybridQuery<T>(endpoint: string, { query, variables, options }: HybridQueryParams<T>): {
    data: T | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<T | null>;
    mutate: import("react").Dispatch<import("react").SetStateAction<T | null>>;
    cancel: () => void | undefined;
};
