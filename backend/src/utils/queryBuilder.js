export function buildSearchFilter(searchTerm) {
  if (!searchTerm || searchTerm.trim() === '') {
    return null;
  }

  const term = searchTerm.trim();
  return `customer_name.ilike.%${term}%,phone_number.ilike.%${term}%`;
}

export function buildFilters(filters) {
  const conditions = [];

  if (filters.customerRegion && filters.customerRegion.length > 0) {
    conditions.push({
      field: 'customer_region',
      operator: 'in',
      value: filters.customerRegion
    });
  }

  if (filters.gender && filters.gender.length > 0) {
    conditions.push({
      field: 'gender',
      operator: 'in',
      value: filters.gender
    });
  }

  if (filters.ageMin !== undefined || filters.ageMax !== undefined) {
    if (filters.ageMin !== undefined) {
      conditions.push({
        field: 'age',
        operator: 'gte',
        value: filters.ageMin
      });
    }
    if (filters.ageMax !== undefined) {
      conditions.push({
        field: 'age',
        operator: 'lte',
        value: filters.ageMax
      });
    }
  }

  if (filters.productCategory && filters.productCategory.length > 0) {
    conditions.push({
      field: 'product_category',
      operator: 'in',
      value: filters.productCategory
    });
  }

  if (filters.tags && filters.tags.length > 0) {
    conditions.push({
      field: 'tags',
      operator: 'in',
      value: filters.tags
    });
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    conditions.push({
      field: 'payment_method',
      operator: 'in',
      value: filters.paymentMethod
    });
  }

  if (filters.dateFrom || filters.dateTo) {
    if (filters.dateFrom) {
      conditions.push({
        field: 'date',
        operator: 'gte',
        value: filters.dateFrom
      });
    }
    if (filters.dateTo) {
      conditions.push({
        field: 'date',
        operator: 'lte',
        value: filters.dateTo
      });
    }
  }

  return conditions;
}

export function applySorting(sortBy, sortOrder = 'desc') {
  const sortMap = {
    date: 'date',
    quantity: 'quantity',
    customer_name: 'customer_name'
  };

  const field = sortMap[sortBy] || 'date';
  const ascending = sortOrder === 'asc';

  return { column: field, ascending };
}
