export interface CommonOptions<TData = any, TVariables = Record<string, any>> {
    cacheKey?: string;
    headers?: Record<string, string>;
    timeout?: number;
    cacheTime?: number;
    retry?: number;
    retryDelay?: number;
    optimisticUpdate?: (prevData: TData | null | undefined, newData: TData) => TData;
    signal?: AbortSignal;
    variables?: TVariables;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
}
export interface QueryOptions<TData, TVariables = Record<string, any>> extends CommonOptions<TData, TVariables> {
    staleTime?: number;
    autoFetch?: boolean;
    prefetch?: boolean;
    operationName?: string;
}
export interface GraphQueryOptions<TData, TVariables = Record<string, any>> extends QueryOptions<TData, TVariables> {
    query: string;
}
export interface HybridQueryOptions<TData, TVariables = Record<string, any>> extends QueryOptions<TData, TVariables> {
    subscriptionUrl?: string;
    onSuccess?: (data: TData) => void;
    onError?: (error: any) => void;
}
export interface MutationOptions<TData, TVariables = Record<string, any>> extends CommonOptions<TData, TVariables> {
    onSuccess?: (data: TData) => void;
    onError?: (error: any) => void;
}
export interface GraphQLMutationOptions<TData, TVariables = Record<string, any>> extends MutationOptions<TData, TVariables> {
    mutation: string;
    operationName?: string;
}
