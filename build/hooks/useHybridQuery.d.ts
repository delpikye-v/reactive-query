/// <reference types="react" />
import { HybridQueryOptions } from "./types";
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
export declare function prefetchQuery<T>(endpoint: string, { query, variables, options }: HybridQueryParams<T>): Promise<T | null>;
