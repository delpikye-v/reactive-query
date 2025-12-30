import { MutationOptions } from "./types";
export declare function useMutation<T = any>(endpoint: string, options?: MutationOptions<T>): {
    mutate: (body: any, method?: "POST" | "PUT" | "PATCH" | "DELETE") => Promise<T>;
    loading: boolean;
    error: any;
    cancel: () => void | undefined;
};
