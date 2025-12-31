export interface BaseOptions<T = any> {
    cacheKey?: string;
    headers?: Record<string, string>;
    timeout?: number;
    retry?: number;
    retryDelay?: number;
    optimisticUpdate?: (prevData: T | null, newData: T) => T;
}
export interface QueryOptions<T> extends BaseOptions<T> {
    variables?: Record<string, any>;
    staleTime?: number;
    autoFetch?: boolean;
    prefetch?: boolean;
    method?: HttpMethod;
}
export interface GraphQueryOptions<T> extends QueryOptions<T> {
    query: string;
}
export interface HybridQueryOptions<T> extends QueryOptions<T> {
    subscriptionUrl?: string;
    signal?: AbortSignal;
}
export interface MutationOptions<T> extends BaseOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
}
export interface GraphQLMutationOptions<TData, TVariables = any> extends MutationOptions<TData> {
    mutation: string;
    variables?: TVariables;
}
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
