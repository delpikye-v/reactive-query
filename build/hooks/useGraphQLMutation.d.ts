import { GraphMutationOptions } from "./types";
export declare function useGraphQLMutation<TData, TVariables extends Record<string, any> = {}>(endpoint: string, options: GraphMutationOptions<TData, TVariables>): {
    mutate: () => Promise<TData | null>;
    mutateAsync: () => Promise<TData>;
    loading: boolean;
    error: Error | null;
    cancel: () => void;
};
