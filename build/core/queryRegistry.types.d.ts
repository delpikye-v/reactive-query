export type QueryEntry<TData = any> = {
    cacheKey: string;
    refetch: () => void;
    setData?: (updater: (prev?: TData) => TData) => void;
    cancel?: () => void;
    cache?: TData;
};
