import { GraphQLMutationOptions } from "./types";
export declare function useGraphQLMutation<TData, TVariables extends Record<string, any> = {}>(endpoint: string, options: GraphQLMutationOptions<TData, TVariables>): {
    mutate: () => Promise<TData | null>;
    loading: boolean;
    error: Error | null;
    cancel: () => void;
};
