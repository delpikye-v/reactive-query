import { GraphQLMutationOptions } from "./types";
export declare function useGraphQLMutation<TData, TVariables = any>(endpoint: string, options: GraphQLMutationOptions<TData, TVariables>): {
    mutate: () => Promise<TData>;
    cancel: () => void;
};
