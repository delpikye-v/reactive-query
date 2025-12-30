/// <reference types="react" />
export interface GraphQueryOptions<T> {
    query: string;
    variables?: Record<string, any>;
    cacheKey?: string;
    staleTime?: number;
    headers?: Record<string, string>;
    timeout?: number;
    retry?: number;
    retryDelay?: number;
    autoFetch?: boolean;
    prefetch?: boolean;
    method?: "GET" | "POST";
    optimisticUpdate?: (prevData: T | null, newData: T) => T;
}
export declare function useGraphQLQuery<T>(endpoint: string, options: GraphQueryOptions<T>): {
    data: T | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<T | null>;
    mutate: import("react").Dispatch<import("react").SetStateAction<T | null>>;
    cancel: () => void | undefined;
};
