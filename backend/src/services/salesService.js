import { supabase } from '../utils/supabase.js';
import { buildSearchFilter, buildFilters, applySorting } from '../utils/queryBuilder.js';

export async function getSales({ search, filters, sortBy, sortOrder, page, pageSize }) {
  let query = supabase.from('sales').select('*', { count: 'exact' });

  if (search) {
    const searchFilter = buildSearchFilter(search);
    if (searchFilter) {
      query = query.or(searchFilter);
    }
  }

  const filterConditions = buildFilters(filters);
  filterConditions.forEach(condition => {
    if (condition.operator === 'in') {
      query = query.in(condition.field, condition.value);
    } else if (condition.operator === 'gte') {
      query = query.gte(condition.field, condition.value);
    } else if (condition.operator === 'lte') {
      query = query.lte(condition.field, condition.value);
    }
  });

  const sorting = applySorting(sortBy, sortOrder);
  query = query.order(sorting.column, { ascending: sorting.ascending });

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    throw error;
  }

  return {
    data,
    total: count,
    page,
    pageSize,
    totalPages: Math.ceil(count / pageSize)
  };
}

export async function getFilterOptions() {
  const { data: sales, error } = await supabase
    .from('sales')
    .select('customer_region, gender, product_category, tags, payment_method');

  if (error) {
    throw error;
  }

  const uniqueValues = {
    customerRegion: [...new Set(sales.map(s => s.customer_region).filter(Boolean))].sort(),
    gender: [...new Set(sales.map(s => s.gender).filter(Boolean))].sort(),
    productCategory: [...new Set(sales.map(s => s.product_category).filter(Boolean))].sort(),
    tags: [...new Set(sales.map(s => s.tags).filter(Boolean))].sort(),
    paymentMethod: [...new Set(sales.map(s => s.payment_method).filter(Boolean))].sort()
  };

  return uniqueValues;
}
