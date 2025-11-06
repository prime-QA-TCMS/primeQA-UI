import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export function useApi<T>(
  apiFn?: ((...args: any[]) => Promise<T>) | null,
  params: any[] = [],
  immediate = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  // ✅ keep latest apiFn without causing re-renders/effect retriggers
  const apiFnRef = useRef<typeof apiFn>(apiFn);
  useEffect(() => {
    apiFnRef.current = apiFn;
  }, [apiFn]);

  // ✅ stable params key to avoid refetch on shallow identity changes
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
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "An unexpected error occurred";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!immediate || !apiFnRef.current) return;
    // call exactly once per (immediate, params) change
    void execute(...(params ?? []));
    // NOTE: execute is stable; deps intentionally exclude it
  }, [immediate, paramsKey]); // ✅ safe, minimal deps

  return { data, loading, error, refetch: execute };
}
