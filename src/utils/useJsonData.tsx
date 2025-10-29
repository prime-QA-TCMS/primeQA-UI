import { useState, useEffect } from "react";

interface UseJsonDataOptions<T> {
  transform?: (data: any) => T;
}
 
export function useJsonData<T>(filePath: string, options?: UseJsonDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchJson() {
      try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

        const json = await res.json();
        const transformed = options?.transform ? options.transform(json) : json;
        if (isMounted) setData(transformed);
      } catch (err: any) {
        if (isMounted) setError(err.message || "Failed to load JSON");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchJson();
    return () => {
      isMounted = false;
    };
  }, [options, filePath]);

  return { data, loading, error };
}
