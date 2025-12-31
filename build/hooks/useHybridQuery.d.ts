/// <reference types="react" />
import type { HybridQueryOptions } from "./types";
export interface HybridQueryParams<T> extends HybridQueryOptions<T> {
    query?: string;
    variables?: Record<string, any>;
}
export declare function useHybridQuery<T>(endpoint: string, { query, variables, ...options }: HybridQueryParams<T>): {
    data: T | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<T | null>;
    setData: import("react").Dispatch<import("react").SetStateAction<T | null>>;
    cancel: () => void;
};
export declare function prefetchQuery<T>(endpoint: string, params: HybridQueryParams<T>): Promise<T | null>;
