import type { MutationOptions, HttpMethod } from "./types";
export declare function useMutation<T = any>(endpoint: string, options?: MutationOptions<T>): {
    mutate: (body: any, method?: HttpMethod) => Promise<T>;
    loading: boolean;
    error: any;
    cancel: () => void;
};
