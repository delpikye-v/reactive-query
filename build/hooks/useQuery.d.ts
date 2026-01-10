/// <reference types="react" />
import { QueryOptions } from "./types";
export declare function useQuery<TData>(endpoint: string, options: Omit<QueryOptions<TData>, "query" | "variables" | "operationName">): {
    data: TData | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<TData | null>;
    refetchAsync: () => Promise<TData>;
    mutate: import("react").Dispatch<import("react").SetStateAction<TData | null>>;
    cancel: () => void | undefined;
};
