import { SortField, SortOrder } from '../types';
import { ChevronDown } from 'lucide-react';

interface SortDropdownProps {
  sortBy: SortField;
  sortOrder: SortOrder;
  onSortChange: (sortBy: SortField, sortOrder: SortOrder) => void;
}

export function SortDropdown({ sortBy, sortOrder, onSortChange }: SortDropdownProps) {
  const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)', field: 'date' as SortField, order: 'desc' as SortOrder },
    { value: 'date-asc', label: 'Date (Oldest First)', field: 'date' as SortField, order: 'asc' as SortOrder },
    { value: 'quantity-desc', label: 'Quantity (High to Low)', field: 'quantity' as SortField, order: 'desc' as SortOrder },
    { value: 'quantity-asc', label: 'Quantity (Low to High)', field: 'quantity' as SortField, order: 'asc' as SortOrder },
    { value: 'customer_name-asc', label: 'Customer Name (A-Z)', field: 'customer_name' as SortField, order: 'asc' as SortOrder },
    { value: 'customer_name-desc', label: 'Customer Name (Z-A)', field: 'customer_name' as SortField, order: 'desc' as SortOrder },
  ];

  const currentValue = `${sortBy}-${sortOrder}`;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
      <div className="relative">
        <select
          value={currentValue}
          onChange={(e) => {
            const option = sortOptions.find(opt => opt.value === e.target.value);
            if (option) {
              onSortChange(option.field, option.order);
            }
          }}
          className="w-full appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
