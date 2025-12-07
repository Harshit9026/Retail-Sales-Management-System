<<<<<<< HEAD
# Retail-Sales-Management-System
Assignment
=======
# Retail Sales Management System

A full-stack web application for managing retail sales data with advanced search, filtering, sorting, and pagination features. Built with React, Node.js, Express, and Supabase PostgreSQL database.

## Overview

This system enables efficient management and analysis of retail sales transactions. Users can search for specific sales records, apply multiple filters simultaneously, sort data by various criteria, and navigate through paginated results while maintaining all active filters and search parameters.

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)

**Backend:**
- Node.js with Express
- Supabase (PostgreSQL database)
- ES6 Modules

## Search Implementation Summary

Full-text search is implemented across customer name and phone number fields using Supabase's `ilike` operator for case-insensitive matching. The search query is constructed on the backend using an OR condition, allowing results that match either field. Search state is managed in React and triggers a new API call on every change, automatically resetting pagination to page 1.

## Filter Implementation Summary

Multi-select filtering is implemented for customer region, gender, product category, tags, and payment method using checkbox groups. Range-based filtering is provided for age (min/max) and date ranges (from/to). Filters are maintained as React state and sent as query parameters to the backend. The backend applies filters using Supabase's `in()` operator for multi-select fields and `gte()`/`lte()` operators for range filters. All filters work independently and in combination, with state preserved during sorting and pagination.

## Sorting Implementation Summary

Sorting is available for date (newest/oldest first), quantity (high to low / low to high), and customer name (A-Z / Z-A). Implemented using a dropdown selector that maintains both the sort field and order. The backend applies sorting using Supabase's `order()` method with the appropriate column and direction. Sort state persists across search and filter changes, and triggers pagination reset to page 1 when modified.

## Pagination Implementation Summary

Server-side pagination displays 10 items per page with Next/Previous navigation controls. Implemented using Supabase's `range()` method with calculated offset and limit values. Current page state is managed in React and preserved across search, filter, and sort operations. The backend returns total count enabling calculation of total pages for navigation controls.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   PORT=3000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

### Database Setup

1. The database schema is automatically created using Supabase migrations.

2. Import the sales data:
   - Download the dataset from the provided Google Drive link
   - Save the CSV file (e.g., `sales_data.csv`)
   - Run the import script:
     ```bash
     cd backend
     npm run import path/to/sales_data.csv
     ```

   Note: The import script will process the CSV file and insert data in batches of 100 records.

## Project Structure

```
root/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   └── utils/           # Helper functions
│   ├── package.json
│   └── README.md
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API communication
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md      # Architecture documentation
│
└── README.md                # This file
```

## Features

- Full-text search across customer information
- Multi-select filtering for categorical data
- Range-based filtering for numeric and date fields
- Flexible sorting options
- Efficient pagination
- Responsive design
- Real-time state management
- Clean separation of concerns
>>>>>>> 9452e26 (first commit)
