import { useState, useEffect } from 'react';
import { fetchFilterOptions } from '../services/api';
import { FilterOptions } from '../types';

export function useFilterOptions() {
  const [options, setOptions] = useState<FilterOptions>({
    customerRegion: [],
    gender: [],
    productCategory: [],
    tags: [],
    paymentMethod: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOptions() {
      try {
        setLoading(true);
        const data = await fetchFilterOptions();
        setOptions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load filter options');
      } finally {
        setLoading(false);
      }
    }

    loadOptions();
  }, []);

  return { options, loading, error };
}
