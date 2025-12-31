/// <reference types="react" />
import type { QueryOptions } from "./types";
export declare function useQuery<T>(endpoint: string, options: QueryOptions<T>): {
    data: T | null;
    error: Error | null;
    loading: boolean;
    refetch: () => Promise<T | null>;
    setData: import("react").Dispatch<import("react").SetStateAction<T | null>>;
    cancel: () => void;
};
