import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api.service';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(endpoint: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await api.get<T>(endpoint);
      setState({ data: result, loading: false, error: null });
    } catch (err: unknown) {
      setState({ data: null, loading: false, error: err instanceof Error ? err.message : 'Error desconocido' });
    }
  }, [endpoint]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}
