/// <reference types="react" />
import { GraphQueryOptions } from "./types";
export declare function useGraphQLQuery<T>(endpoint: string, options: GraphQueryOptions<T>): {
    data: T | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<T | null>;
    mutate: import("react").Dispatch<import("react").SetStateAction<T | null>>;
    cancel: () => void | undefined;
};
