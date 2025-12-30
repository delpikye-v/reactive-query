export declare function useReactive<T>(initial: T): [T, (v: T) => void];
export declare class ReactiveValue<T> {
    private _value;
    private listeners;
    constructor(value: T);
    get(): T;
    set(value: T): void;
    subscribe(cb: (v: T) => void): () => boolean;
}
