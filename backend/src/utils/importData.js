import { supabase } from './supabase.js';
import fs from 'fs';

export async function importSalesData(csvFilePath) {
  console.log('Reading CSV file...');

  const fileContent = fs.readFileSync(csvFilePath, 'utf-8');
  const lines = fileContent.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());

  const sales = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = lines[i].split(',').map(v => v.trim());

    if (values.length !== headers.length) continue;

    const sale = {
      customer_id: values[0] || '',
      customer_name: values[1] || '',
      phone_number: values[2] || '',
      gender: values[3] || null,
      age: values[4] ? parseInt(values[4]) : null,
      customer_region: values[5] || null,
      customer_type: values[6] || null,
      product_id: values[7] || '',
      product_name: values[8] || '',
      brand: values[9] || null,
      product_category: values[10] || null,
      tags: values[11] || null,
      quantity: values[12] ? parseInt(values[12]) : 1,
      price_per_unit: values[13] ? parseFloat(values[13]) : 0,
      discount_percentage: values[14] ? parseFloat(values[14]) : 0,
      total_amount: values[15] ? parseFloat(values[15]) : 0,
      final_amount: values[16] ? parseFloat(values[16]) : 0,
      date: values[17] || new Date().toISOString().split('T')[0],
      payment_method: values[18] || null,
      order_status: values[19] || null,
      delivery_type: values[20] || null,
      store_id: values[21] || null,
      store_location: values[22] || null,
      salesperson_id: values[23] || null,
      employee_name: values[24] || null
    };

    sales.push(sale);
  }

  console.log(`Parsed ${sales.length} records. Starting import...`);

  const batchSize = 100;
  for (let i = 0; i < sales.length; i += batchSize) {
    const batch = sales.slice(i, i + batchSize);
    const { error } = await supabase.from('sales').insert(batch);

    if (error) {
      console.error(`Error importing batch ${i / batchSize + 1}:`, error);
      throw error;
    }

    console.log(`Imported batch ${i / batchSize + 1}/${Math.ceil(sales.length / batchSize)}`);
  }

  console.log('Import completed successfully!');
}

if (process.argv[2]) {
  importSalesData(process.argv[2])
    .then(() => {
      console.log('Done!');
      process.exit(0);
    })
    .catch(err => {
      console.error('Import failed:', err);
      process.exit(1);
    });
}
