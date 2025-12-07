import { SalesResponse, FilterOptions, Filters, SortField, SortOrder } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface FetchSalesParams {
  search?: string;
  filters?: Filters;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  page?: number;
  pageSize?: number;
}

export async function fetchSales(params: FetchSalesParams): Promise<SalesResponse> {
  const queryParams = new URLSearchParams();

  if (params.search) {
    queryParams.append('search', params.search);
  }

  if (params.filters) {
    if (params.filters.customerRegion.length > 0) {
      queryParams.append('customerRegion', params.filters.customerRegion.join(','));
    }
    if (params.filters.gender.length > 0) {
      queryParams.append('gender', params.filters.gender.join(','));
    }
    if (params.filters.ageMin !== undefined) {
      queryParams.append('ageMin', params.filters.ageMin.toString());
    }
    if (params.filters.ageMax !== undefined) {
      queryParams.append('ageMax', params.filters.ageMax.toString());
    }
    if (params.filters.productCategory.length > 0) {
      queryParams.append('productCategory', params.filters.productCategory.join(','));
    }
    if (params.filters.tags.length > 0) {
      queryParams.append('tags', params.filters.tags.join(','));
    }
    if (params.filters.paymentMethod.length > 0) {
      queryParams.append('paymentMethod', params.filters.paymentMethod.join(','));
    }
    if (params.filters.dateFrom) {
      queryParams.append('dateFrom', params.filters.dateFrom);
    }
    if (params.filters.dateTo) {
      queryParams.append('dateTo', params.filters.dateTo);
    }
  }

  if (params.sortBy) {
    queryParams.append('sortBy', params.sortBy);
  }
  if (params.sortOrder) {
    queryParams.append('sortOrder', params.sortOrder);
  }
  if (params.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params.pageSize) {
    queryParams.append('pageSize', params.pageSize.toString());
  }

  const response = await fetch(`${API_BASE_URL}/sales?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch sales data');
  }

  return response.json();
}

export async function fetchFilterOptions(): Promise<FilterOptions> {
  const response = await fetch(`${API_BASE_URL}/filter-options`);

  if (!response.ok) {
    throw new Error('Failed to fetch filter options');
  }

  return response.json();
}
