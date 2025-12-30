export interface GraphQLMutationOptions<TData, TVariables = any> {
    mutation: string;
    variables?: TVariables;
    cacheKey?: string;
    retry?: number;
    retryDelay?: number;
    headers?: Record<string, string>;
    timeout?: number;
    optimisticUpdate?: (prev: TData | undefined, newData: TData) => TData;
}
export declare function useGraphQLMutation<TData, TVariables = any>(endpoint: string, options: GraphQLMutationOptions<TData, TVariables>): {
    mutate: () => Promise<TData>;
    cancel: () => void;
};
