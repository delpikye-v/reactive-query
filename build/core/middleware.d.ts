import type { HttpMethod } from "../hooks/types";
export type MiddlewareContext<TBody = any> = {
    endpoint: string;
    body?: TBody;
    method: HttpMethod;
    options?: {
        headers?: Record<string, string>;
        cacheKey?: string;
        signal?: AbortSignal;
    };
};
export type MiddlewareFn<TBody = any> = (ctx: MiddlewareContext<TBody>) => Promise<MiddlewareContext<TBody>>;
export type NamedMiddleware = {
    name: string;
    fn: MiddlewareFn;
};
export declare function useMiddleware(name: string, fn: MiddlewareFn): void;
export declare function removeMiddleware(name: string): void;
export declare function runMiddlewares<TBody>(endpoint: string, body: TBody | undefined, method: HttpMethod, options?: MiddlewareContext["options"]): Promise<MiddlewareContext<TBody>>;
