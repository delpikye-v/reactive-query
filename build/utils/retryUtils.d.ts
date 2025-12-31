export declare function retryOperation<T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T>;
