import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage asynchronous service calls with loading and error states.
 * Mimics TanStack Query / SWR interface for trivial future migration.
 *
 * @param {Function} asyncFunction
 * @param {boolean} [immediate=true]
 * @param {Array} [deps=[]]
 * @returns {{ data: any, loading: boolean, error: Error|null, refetch: Function }}
 */
export function useAsync(asyncFunction, immediate = true, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await asyncFunction(...args);
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, refetch: execute };
}
