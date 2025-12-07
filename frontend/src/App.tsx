import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { SortDropdown } from './components/SortDropdown';
import { SalesTable } from './components/SalesTable';
import { Pagination } from './components/Pagination';
import { useSales } from './hooks/useSales';
import { useFilterOptions } from './hooks/useFilterOptions';
import { Filters, SortField, SortOrder } from './types';
import { Loader2, ShoppingCart } from 'lucide-react';

function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    customerRegion: [],
    gender: [],
    productCategory: [],
    tags: [],
    paymentMethod: []
  });
  const [sortBy, setSortBy] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [page, setPage] = useState(1);

  const { sales, totalPages, loading, error } = useSales(search, filters, sortBy, sortOrder, page);
  const { options, loading: optionsLoading } = useFilterOptions();

  const handleSortChange = (newSortBy: SortField, newSortOrder: SortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      customerRegion: [],
      gender: [],
      productCategory: [],
      tags: [],
      paymentMethod: []
    });
    setPage(1);
  };

  if (optionsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Retail Sales Management</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchBar value={search} onChange={handleSearchChange} />
          <SortDropdown sortBy={sortBy} sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              options={options}
              onChange={handleFiltersChange}
              onReset={handleResetFilters}
            />
          </aside>

          <div className="lg:col-span-3 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-lg shadow p-12 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <>
                <SalesTable sales={sales} />
                {totalPages > 0 && (
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
