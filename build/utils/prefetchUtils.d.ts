import { queryRegistry } from "../core/globalQuery";
import { QueryOptions } from "../hooks/types";
interface PrefetchParams<TData, TVariables = Record<string, any>> {
    query?: string;
    variables?: TVariables;
    headers?: Record<string, string>;
    body?: any;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    signal?: AbortSignal;
}
type ErrorHandler = (error: any, info?: {
    endpoint: string;
}) => void;
export declare function setGlobalErrorHandler(handler: ErrorHandler): void;
export declare function prefetchData<T>(fetchData: () => Promise<T>, cacheKey: string, cacheRegistry: typeof queryRegistry): void;
export declare function fetchWithRetry<TData>(fn: (signal: AbortSignal) => Promise<TData>, retries?: number, retryDelay?: number, timeout?: number): Promise<TData>;
export declare function applyOptimisticUpdate<TData>(cacheKey: string | undefined, newData: TData, optimisticUpdate?: (prev: TData | null | undefined, next: TData) => TData): void;
export declare function commonFetch<TData>(endpoint: string, options: PrefetchParams<TData> & {
    autoFetch?: boolean;
    staleTime?: number;
    cacheKey?: string;
    cacheTime?: number;
    isGraphQL?: boolean;
    operationName?: string;
}): Promise<TData>;
export declare function prefetchQuery<TData>(endpoint: string, options?: QueryOptions<TData, any> & {
    isGraphQL?: boolean;
    query?: string;
}): Promise<TData | null>;
export {};
