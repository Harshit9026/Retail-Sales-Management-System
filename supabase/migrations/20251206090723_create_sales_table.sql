/*
  # Create Sales Management System Tables

  ## Overview
  Creates the core sales table for the Retail Sales Management System with comprehensive
  customer, product, sales, and operational data tracking.

  ## New Tables
    
  ### `sales`
  Main table storing all sales transactions with the following fields:
  
  **Customer Fields:**
  - `customer_id` (text) - Unique customer identifier
  - `customer_name` (text) - Full name of the customer
  - `phone_number` (text) - Customer contact number
  - `gender` (text) - Customer gender
  - `age` (integer) - Customer age
  - `customer_region` (text) - Geographic region of customer
  - `customer_type` (text) - Type/category of customer
  
  **Product Fields:**
  - `product_id` (text) - Unique product identifier
  - `product_name` (text) - Name of the product
  - `brand` (text) - Product brand
  - `product_category` (text) - Product category
  - `tags` (text) - Product tags for categorization
  
  **Sales Fields:**
  - `quantity` (integer) - Number of items sold
  - `price_per_unit` (decimal) - Unit price
  - `discount_percentage` (decimal) - Discount applied
  - `total_amount` (decimal) - Total before discount
  - `final_amount` (decimal) - Final amount after discount
  
  **Operational Fields:**
  - `date` (date) - Transaction date
  - `payment_method` (text) - Payment method used
  - `order_status` (text) - Current order status
  - `delivery_type` (text) - Delivery method
  - `store_id` (text) - Store identifier
  - `store_location` (text) - Store location
  - `salesperson_id` (text) - Salesperson identifier
  - `employee_name` (text) - Name of salesperson

  ## Security
  - Enable RLS on `sales` table
  - Add policy for public read access (for the assignment demo)
  
  ## Indexes
  - Create indexes on frequently queried fields for performance:
    - customer_name, phone_number (for search)
    - customer_region, gender, product_category, payment_method (for filters)
    - date (for date range filtering and sorting)
    - quantity (for sorting)
*/

CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id text NOT NULL,
  customer_name text NOT NULL,
  phone_number text NOT NULL,
  gender text,
  age integer,
  customer_region text,
  customer_type text,
  product_id text NOT NULL,
  product_name text NOT NULL,
  brand text,
  product_category text,
  tags text,
  quantity integer NOT NULL DEFAULT 1,
  price_per_unit decimal(10,2) NOT NULL,
  discount_percentage decimal(5,2) DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  final_amount decimal(10,2) NOT NULL,
  date date NOT NULL,
  payment_method text,
  order_status text,
  delivery_type text,
  store_id text,
  store_location text,
  salesperson_id text,
  employee_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to sales"
  ON sales
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_sales_customer_name ON sales(customer_name);
CREATE INDEX IF NOT EXISTS idx_sales_phone_number ON sales(phone_number);
CREATE INDEX IF NOT EXISTS idx_sales_customer_region ON sales(customer_region);
CREATE INDEX IF NOT EXISTS idx_sales_gender ON sales(gender);
CREATE INDEX IF NOT EXISTS idx_sales_product_category ON sales(product_category);
CREATE INDEX IF NOT EXISTS idx_sales_payment_method ON sales(payment_method);
CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date DESC);
CREATE INDEX IF NOT EXISTS idx_sales_quantity ON sales(quantity);
CREATE INDEX IF NOT EXISTS idx_sales_age ON sales(age);