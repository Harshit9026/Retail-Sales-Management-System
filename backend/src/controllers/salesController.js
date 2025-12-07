import { getSales, getFilterOptions } from '../services/salesService.js';

export async function fetchSales(req, res) {
  try {
    const {
      search = '',
      customerRegion,
      gender,
      ageMin,
      ageMax,
      productCategory,
      tags,
      paymentMethod,
      dateFrom,
      dateTo,
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      pageSize = 10
    } = req.query;

    const filters = {
      customerRegion: customerRegion ? customerRegion.split(',') : [],
      gender: gender ? gender.split(',') : [],
      ageMin: ageMin ? parseInt(ageMin) : undefined,
      ageMax: ageMax ? parseInt(ageMax) : undefined,
      productCategory: productCategory ? productCategory.split(',') : [],
      tags: tags ? tags.split(',') : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',') : [],
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined
    };

    const result = await getSales({
      search,
      filters,
      sortBy,
      sortOrder,
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
}

export async function fetchFilterOptions(req, res) {
  try {
    const options = await getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({ error: 'Failed to fetch filter options' });
  }
}
