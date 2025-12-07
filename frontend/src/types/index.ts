export interface Sale {
  id: string;
  customer_id: string;
  customer_name: string;
  phone_number: string;
  gender: string;
  age: number;
  customer_region: string;
  customer_type: string;
  product_id: string;
  product_name: string;
  brand: string;
  product_category: string;
  tags: string;
  quantity: number;
  price_per_unit: number;
  discount_percentage: number;
  total_amount: number;
  final_amount: number;
  date: string;
  payment_method: string;
  order_status: string;
  delivery_type: string;
  store_id: string;
  store_location: string;
  salesperson_id: string;
  employee_name: string;
  created_at: string;
}

export interface SalesResponse {
  data: Sale[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  customerRegion: string[];
  gender: string[];
  productCategory: string[];
  tags: string[];
  paymentMethod: string[];
}

export interface Filters {
  customerRegion: string[];
  gender: string[];
  ageMin?: number;
  ageMax?: number;
  productCategory: string[];
  tags: string[];
  paymentMethod: string[];
  dateFrom?: string;
  dateTo?: string;
}

export type SortField = 'date' | 'quantity' | 'customer_name';
export type SortOrder = 'asc' | 'desc';
