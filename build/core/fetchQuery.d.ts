import { QueryOptions } from "../hooks/types";
export declare function fetchQuery<TData>(endpoint: string, options: QueryOptions<TData, any> & {
    query?: string;
}): Promise<TData>;
