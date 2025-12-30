export declare function retryOperation<T>(operation: () => Promise<T>, retries: number, delay: number): Promise<T>;
