import { FilterOptions, Filters } from '../types';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: Filters;
  options: FilterOptions;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export function FilterPanel({ filters, options, onChange, onReset }: FilterPanelProps) {
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleMultiSelect = (key: keyof Pick<Filters, 'customerRegion' | 'gender' | 'productCategory' | 'tags' | 'paymentMethod'>, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, updated as any);
  };

  const hasActiveFilters =
    filters.customerRegion.length > 0 ||
    filters.gender.length > 0 ||
    filters.ageMin !== undefined ||
    filters.ageMax !== undefined ||
    filters.productCategory.length > 0 ||
    filters.tags.length > 0 ||
    filters.paymentMethod.length > 0 ||
    filters.dateFrom !== undefined ||
    filters.dateTo !== undefined;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Reset All
          </button>
        )}
      </div>

      <div className="space-y-4">
        <FilterSection title="Customer Region">
          <CheckboxGroup
            options={options.customerRegion}
            selected={filters.customerRegion}
            onChange={(value) => toggleMultiSelect('customerRegion', value)}
          />
        </FilterSection>

        <FilterSection title="Gender">
          <CheckboxGroup
            options={options.gender}
            selected={filters.gender}
            onChange={(value) => toggleMultiSelect('gender', value)}
          />
        </FilterSection>

        <FilterSection title="Age Range">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.ageMin || ''}
              onChange={(e) => updateFilter('ageMin', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.ageMax || ''}
              onChange={(e) => updateFilter('ageMax', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </FilterSection>

        <FilterSection title="Product Category">
          <CheckboxGroup
            options={options.productCategory}
            selected={filters.productCategory}
            onChange={(value) => toggleMultiSelect('productCategory', value)}
          />
        </FilterSection>

        <FilterSection title="Tags">
          <CheckboxGroup
            options={options.tags}
            selected={filters.tags}
            onChange={(value) => toggleMultiSelect('tags', value)}
          />
        </FilterSection>

        <FilterSection title="Payment Method">
          <CheckboxGroup
            options={options.paymentMethod}
            selected={filters.paymentMethod}
            onChange={(value) => toggleMultiSelect('paymentMethod', value)}
          />
        </FilterSection>

        <FilterSection title="Date Range">
          <div className="space-y-2">
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={(e) => updateFilter('dateFrom', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={(e) => updateFilter('dateTo', e.target.value || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </FilterSection>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t pt-4 first:border-t-0 first:pt-0">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function CheckboxGroup({
  options,
  selected,
  onChange
}: {
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2 max-h-40 overflow-y-auto">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onChange(option)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
    </div>
  );
}
