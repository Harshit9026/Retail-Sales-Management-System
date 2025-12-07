import { useState, useEffect } from 'react';
import { fetchSales } from '../services/api';
import { Sale, Filters, SortField, SortOrder } from '../types';

export function useSales(
  search: string,
  filters: Filters,
  sortBy: SortField,
  sortOrder: SortOrder,
  page: number
) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSales() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchSales({
          search,
          filters,
          sortBy,
          sortOrder,
          page,
          pageSize: 10
        });

        if (!cancelled) {
          setSales(response.data);
          setTotal(response.total);
          setTotalPages(response.totalPages);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load sales');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSales();

    return () => {
      cancelled = true;
    };
  }, [search, filters, sortBy, sortOrder, page]);

  return { sales, total, totalPages, loading, error };
}
