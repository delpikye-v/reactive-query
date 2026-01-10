import { MutationOptions } from "./types";
type TMethod = "POST" | "PUT" | "PATCH" | "DELETE";
export declare function useMutation<TData = any>(endpoint: string, options?: Omit<MutationOptions<TData>, "query" | "variables">): {
    mutate: (body: any, method?: TMethod) => Promise<TData | null>;
    mutateAsync: (body: any, method?: TMethod) => Promise<TData>;
    loading: boolean;
    error: any;
    cancel: () => void;
};
export {};
