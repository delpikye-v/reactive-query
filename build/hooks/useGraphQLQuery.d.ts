/// <reference types="react" />
import { GraphQueryOptions } from "./types";
export declare function useGraphQLQuery<TData>(endpoint: string, options: GraphQueryOptions<TData>): {
    data: TData | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<TData | null>;
    refetchAsync: () => Promise<TData>;
    mutate: import("react").Dispatch<import("react").SetStateAction<TData | null>>;
    cancel: () => void | undefined;
};
