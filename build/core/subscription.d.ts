type Callback<TData> = (data: TData) => void;
export declare class SubscriptionManager<TData> {
    private url;
    private callbacks;
    private ws;
    constructor(url: string);
    connect(): void;
    subscribe(cb: Callback<TData>): () => boolean;
    disconnect(): void;
}
export {};
