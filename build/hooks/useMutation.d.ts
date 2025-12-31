import { MutationOptions } from "./types";
export declare function useMutation<TData = any>(endpoint: string, options?: Omit<MutationOptions<TData>, "query" | "variables">): {
    mutate: (body: any, method?: "POST" | "PUT" | "PATCH" | "DELETE") => Promise<TData>;
    loading: boolean;
    error: any;
    cancel: () => void;
};
