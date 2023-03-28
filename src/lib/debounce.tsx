import { useState, useEffect, useCallback } from "react";

type UseDebounceReturnType<T> = [T, () => void];

function useDebounce<T>(value: T, delay: number): UseDebounceReturnType<T> {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const cancelDebounce = useCallback(() => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
    }, [timeoutId]);

    useEffect(() => {
        cancelDebounce();

        const id = setTimeout(() => {
            setDebouncedValue(value);
            setTimeoutId(null);
        }, delay);

        setTimeoutId(() => id);

        return cancelDebounce;
    }, [value, delay, cancelDebounce]);

    return [debouncedValue, cancelDebounce];
}

export default useDebounce;