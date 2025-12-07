# Retail Sales Management System - Backend

Backend API for the Retail Sales Management System, providing endpoints for search, filtering, sorting, and pagination of sales data.

## Tech Stack

- Node.js with Express
- Supabase (PostgreSQL)
- ES6 Modules

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API route definitions
│   ├── utils/           # Helper functions and utilities
│   └── index.js         # Application entry point
├── package.json
└── README.md
```

## Setup Instructions

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Create `.env` file with:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=3000
   ```

3. Import sales data (optional):
   ```bash
   npm run import path/to/sales_data.csv
   ```

4. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### GET /api/sales

Fetch sales data with support for search, filtering, sorting, and pagination.

**Query Parameters:**
- `search` - Search by customer name or phone number
- `customerRegion` - Comma-separated regions
- `gender` - Comma-separated genders
- `ageMin` - Minimum age
- `ageMax` - Maximum age
- `productCategory` - Comma-separated categories
- `tags` - Comma-separated tags
- `paymentMethod` - Comma-separated payment methods
- `dateFrom` - Start date (YYYY-MM-DD)
- `dateTo` - End date (YYYY-MM-DD)
- `sortBy` - Sort field (date, quantity, customer_name)
- `sortOrder` - Sort direction (asc, desc)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

### GET /api/filter-options

Fetch available filter options for dropdowns.

### GET /health

Health check endpoint.
