import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export function useApi<T>(apiFn?: ((...args: any[]) => Promise<T>) | null, params: any[] = [], immediate = true ) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const apiFnRef = useRef<typeof apiFn>(apiFn);
  useEffect(() => {apiFnRef.current = apiFn;}, [apiFn]);

  const paramsKey = useMemo(() => JSON.stringify(params ?? []), [params]);

  const execute = useCallback(async (...callArgs: any[]) => {
    if (!apiFnRef.current) return null;
    setLoading(true);
    setError(null);
    try {
      const result = await apiFnRef.current(...callArgs);
      setData(result);
      return result;
    } catch (err: any) {
      console.error("❌ API Error:", err);
      const message = err?.response?.data?.message || err?.message || "An unexpected error occurred";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!immediate || !apiFnRef.current) return;
    void execute(...(params ?? []));
  }, [immediate, paramsKey]); 

  return { data, loading, error, refetch: execute };
}
