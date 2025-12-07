# Retail Sales Management System - Frontend

Modern React-based frontend for the Retail Sales Management System with advanced search, filtering, sorting, and pagination capabilities.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (icons)

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API communication layer
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json
└── README.md
```

## Setup Instructions

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Create `.env` file with:
   ```
   VITE_API_URL=http://localhost:3000/api
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Features

- Full-text search across customer name and phone number
- Multi-select filtering for regions, categories, payment methods
- Age range and date range filtering
- Sorting by date, quantity, and customer name
- Pagination with 10 items per page
- Responsive design
- Real-time filter state management
