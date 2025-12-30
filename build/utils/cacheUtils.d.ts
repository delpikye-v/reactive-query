export declare function updateCache<T>(cacheKey: string | undefined, optimisticUpdate: ((prevData: T | null, newData: T) => T) | undefined, newData: T): void;
