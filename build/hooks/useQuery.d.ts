/// <reference types="react" />
export interface QueryOptions<T> {
    variables?: Record<string, any>;
    cacheKey?: string;
    staleTime?: number;
    headers?: Record<string, string>;
    timeout?: number;
    retry?: number;
    retryDelay?: number;
    optimisticUpdate?: (prevData: T | null, newData: T) => T;
}
export declare function useQuery<T>(endpoint: string, options: QueryOptions<T>): {
    data: T | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<T | null>;
    mutate: import("react").Dispatch<import("react").SetStateAction<T | null>>;
    cancel: () => void | undefined;
};
