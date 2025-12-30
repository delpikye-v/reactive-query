export interface MutationOptions<T> {
    cacheKey?: string;
    optimisticUpdate?: (prevData: any, newData: T) => any;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    retry?: number;
    retryDelay?: number;
    headers?: Record<string, string>;
    timeout?: number;
}
export declare function useMutation<T = any>(endpoint: string, options?: MutationOptions<T>): {
    mutate: (body: any, method?: "POST" | "PUT" | "PATCH" | "DELETE") => Promise<T>;
    loading: boolean;
    error: any;
    cancel: () => void | undefined;
};
