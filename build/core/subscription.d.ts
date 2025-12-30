type Callback<T> = (data: T) => void;
export declare class SubscriptionManager<T> {
    private url;
    private callbacks;
    private ws;
    constructor(url: string);
    connect(): void;
    subscribe(cb: Callback<T>): () => boolean;
    disconnect(): void;
}
export {};
