/// <reference types="react" />
import { HybridQueryOptions } from "./types";
export declare function useHybridQuery<TData>(endpoint: string, { query, variables, options, }: {
    query?: string;
    variables?: Record<string, any>;
    options?: HybridQueryOptions<TData>;
}): {
    data: TData | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<TData | null>;
    mutate: import("react").Dispatch<import("react").SetStateAction<TData | null>>;
    cancel: () => void;
};
