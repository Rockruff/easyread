import { useEffect, useRef } from "react";

export function useStableMemo<K, V>(
  keys: K[],
  createValue: (key: K) => V,
  disposeValue?: (value: V, key: K) => void,
): V[] {
  const cacheRef = useRef(new Map<K, V>());
  const cache = cacheRef.current;

  // remove values for keys that are gone
  for (const [key, value] of cache) {
    if (keys.includes(key)) continue;
    if (disposeValue) disposeValue(value, key);
    cache.delete(key);
  }

  // add new values & collect outputs
  const values: V[] = [];
  for (const key of keys) {
    let value = cache.get(key);
    if (!value) {
      value = createValue(key);
      cache.set(key, value);
    }
    values.push(value);
  }

  // cleanup everything on unmount
  useEffect(() => {
    return () => {
      const cache = cacheRef.current;
      for (const [key, value] of cache) {
        if (disposeValue) disposeValue(value, key);
        cache.delete(key);
      }
    };
  }, []);

  // return values in the same order as keys
  return values;
}
