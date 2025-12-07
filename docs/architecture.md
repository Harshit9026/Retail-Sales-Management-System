# Architecture Documentation

## System Overview

The Retail Sales Management System follows a client-server architecture with clear separation between frontend presentation logic and backend data management. The system is designed for scalability, maintainability, and performance.

## Backend Architecture

### Technology Stack
- **Runtime:** Node.js with ES6 Modules
- **Framework:** Express.js for HTTP server and routing
- **Database:** Supabase (PostgreSQL)
- **ORM:** Supabase JavaScript client

### Architecture Pattern
The backend follows a three-layer architecture:

1. **Routes Layer** (`routes/`): Defines API endpoints and maps them to controllers
2. **Controllers Layer** (`controllers/`): Handles HTTP requests/responses and input validation
3. **Services Layer** (`services/`): Contains business logic and database operations
4. **Utils Layer** (`utils/`): Shared utilities and helper functions

### Data Flow (Backend)

```
HTTP Request
    ↓
Routes (salesRoutes.js)
    ↓
Controllers (salesController.js)
    ├─ Parse query parameters
    ├─ Validate input
    └─ Call service methods
        ↓
Services (salesService.js)
    ├─ Build database queries
    ├─ Execute Supabase operations
    └─ Transform results
        ↓
Utils (queryBuilder.js, supabase.js)
    ├─ Query construction helpers
    └─ Database client configuration
        ↓
Database (Supabase/PostgreSQL)
        ↓
Response (JSON)
```

### Key Components

#### Routes (`src/routes/salesRoutes.js`)
- Defines RESTful API endpoints
- Maps routes to controller methods
- Endpoints:
  - `GET /api/sales` - Fetch sales with filters
  - `GET /api/filter-options` - Fetch available filter values

#### Controllers (`src/controllers/salesController.js`)
- `fetchSales()`: Processes sales query requests
  - Parses query parameters
  - Converts comma-separated values to arrays
  - Validates numeric inputs
  - Calls sales service with structured parameters

- `fetchFilterOptions()`: Returns unique values for filter dropdowns

#### Services (`src/services/salesService.js`)
- `getSales()`: Core business logic for data retrieval
  - Constructs complex database queries
  - Applies search, filters, sorting, and pagination
  - Returns paginated results with metadata

- `getFilterOptions()`: Extracts unique filter values from database

#### Utils
- `queryBuilder.js`: Helper functions for query construction
  - `buildSearchFilter()`: Creates case-insensitive search conditions
  - `buildFilters()`: Converts filter object to query conditions
  - `applySorting()`: Maps sort parameters to database fields

- `supabase.js`: Database client configuration and initialization

### Database Schema

**Table: `sales`**

Primary columns:
- `id` (uuid, primary key)
- Customer fields (customer_id, customer_name, phone_number, gender, age, customer_region, customer_type)
- Product fields (product_id, product_name, brand, product_category, tags)
- Sales fields (quantity, price_per_unit, discount_percentage, total_amount, final_amount)
- Operational fields (date, payment_method, order_status, delivery_type, store_id, store_location, salesperson_id, employee_name)
- Timestamp (created_at)

**Indexes:**
- customer_name (search performance)
- phone_number (search performance)
- customer_region, gender, product_category, payment_method (filter performance)
- date (sorting and range filtering)
- quantity (sorting)
- age (range filtering)

**Security:**
- Row Level Security (RLS) enabled
- Public read access policy for demo purposes

## Frontend Architecture

### Technology Stack
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Hooks (useState, useEffect)

### Architecture Pattern
The frontend follows a component-based architecture with custom hooks for data management:

1. **Components Layer** (`components/`): Reusable UI components
2. **Hooks Layer** (`hooks/`): Custom hooks for data fetching and state management
3. **Services Layer** (`services/`): API communication logic
4. **Types Layer** (`types/`): TypeScript interfaces and types

### Data Flow (Frontend)

```
User Interaction
    ↓
React Components
    ├─ SearchBar
    ├─ FilterPanel
    ├─ SortDropdown
    ├─ SalesTable
    └─ Pagination
        ↓
State Management (useState)
    ├─ search
    ├─ filters
    ├─ sortBy/sortOrder
    └─ page
        ↓
Custom Hooks
    ├─ useSales()
    └─ useFilterOptions()
        ↓
API Services (services/api.ts)
    ├─ fetchSales()
    └─ fetchFilterOptions()
        ↓
Backend API
        ↓
Update State & Re-render
```

### Key Components

#### Main Application (`App.tsx`)
- Central state management for all query parameters
- Orchestrates communication between components
- Handles state changes and triggers API calls
- Manages loading and error states

#### Components

**SearchBar** (`components/SearchBar.tsx`)
- Controlled input component
- Debounced search functionality via parent state
- Icon integration for visual feedback

**FilterPanel** (`components/FilterPanel.tsx`)
- Multi-select checkbox groups for categorical filters
- Numeric inputs for age range
- Date inputs for date range
- Reset functionality to clear all filters
- Collapsible sections for better UX

**SortDropdown** (`components/SortDropdown.tsx`)
- Select dropdown for sort options
- Combines field and order in single selection
- Visual indicator of current sort state

**SalesTable** (`components/SalesTable.tsx`)
- Responsive table layout
- Formatted data display
- Empty state handling
- Row hover effects

**Pagination** (`components/Pagination.tsx`)
- Next/Previous navigation
- Current page indicator
- Disabled state for boundary pages

#### Custom Hooks

**useSales** (`hooks/useSales.ts`)
- Fetches sales data from API
- Manages loading and error states
- Automatically refetches on parameter changes
- Cleanup on unmount to prevent memory leaks

**useFilterOptions** (`hooks/useFilterOptions.ts`)
- Fetches available filter options once on mount
- Provides unique values for filter dropdowns

#### Services

**api.ts** (`services/api.ts`)
- `fetchSales()`: Constructs query parameters and calls backend
  - Converts filter arrays to comma-separated strings
  - Handles optional parameters
  - Returns typed response

- `fetchFilterOptions()`: Fetches filter dropdown values

#### Types

**index.ts** (`types/index.ts`)
- Type definitions for all data structures
- Interfaces for API requests/responses
- Type safety throughout the application

### State Management Strategy

The application uses React's built-in state management:

1. **Local State**: Component-specific UI state
2. **Lifted State**: Shared state managed in App.tsx
3. **Derived State**: Computed values from existing state
4. **Server State**: Managed by custom hooks with useEffect

State updates trigger automatic re-renders and API calls through dependency arrays in useEffect hooks.

## Data Flow

### Complete Request Flow

1. **User Action**: User types in search or selects filter
2. **State Update**: React updates local state
3. **Page Reset**: Pagination resets to page 1
4. **Effect Trigger**: useEffect in useSales hook detects change
5. **API Call**: Service constructs and sends HTTP request
6. **Backend Processing**:
   - Route handler receives request
   - Controller parses parameters
   - Service builds database query
   - Query executes on Supabase
7. **Response**: Backend returns JSON with data and metadata
8. **State Update**: Hook updates sales, total, totalPages state
9. **Re-render**: React updates UI with new data

### Query Combination Logic

All query parameters work together:
- Search filters results via OR condition
- Filters apply via AND conditions (each filter must match)
- Sorting applies after filtering
- Pagination applies to final result set

Backend query execution order:
1. Apply search (if present)
2. Apply all filters
3. Apply sorting
4. Count total results
5. Apply pagination range
6. Return data + metadata

## Folder Structure

### Backend Structure
```
backend/
├── src/
│   ├── controllers/       # HTTP request handlers
│   │   └── salesController.js
│   ├── services/          # Business logic layer
│   │   └── salesService.js
│   ├── routes/            # API endpoint definitions
│   │   └── salesRoutes.js
│   ├── utils/             # Helper functions
│   │   ├── supabase.js
│   │   └── queryBuilder.js
│   └── index.js           # Server entry point
├── package.json
├── .env
└── README.md
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── SortDropdown.tsx
│   │   ├── SalesTable.tsx
│   │   └── Pagination.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useSales.ts
│   │   └── useFilterOptions.ts
│   ├── services/          # API layer
│   │   └── api.ts
│   ├── types/             # TypeScript definitions
│   │   └── index.ts
│   ├── utils/             # Helper functions
│   ├── App.tsx            # Main component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── package.json
├── .env
└── README.md
```

## Module Responsibilities

### Backend Modules

**index.js**
- Express server configuration
- Middleware setup (CORS, JSON parsing)
- Route mounting
- Error handling
- Server initialization

**routes/salesRoutes.js**
- API endpoint definitions
- Route-to-controller mapping
- RESTful route organization

**controllers/salesController.js**
- Request parsing and validation
- Response formatting
- Error handling
- Service layer invocation

**services/salesService.js**
- Core business logic
- Database query construction
- Data transformation
- Result aggregation

**utils/queryBuilder.js**
- Search query construction
- Filter condition building
- Sort parameter mapping
- Query abstraction

**utils/supabase.js**
- Database client initialization
- Connection configuration
- Environment variable management

### Frontend Modules

**App.tsx**
- Application state management
- Component orchestration
- Event handler coordination
- Conditional rendering logic

**components/**
- Encapsulated UI logic
- Props-based configuration
- Event emission to parent
- Reusable presentation components

**hooks/**
- Data fetching logic
- Side effect management
- State lifecycle handling
- API integration

**services/api.ts**
- HTTP request construction
- Query parameter serialization
- Response parsing
- Error handling

**types/index.ts**
- Type safety definitions
- Interface contracts
- Type exports

## Design Decisions

### Backend Design Choices

1. **Three-Layer Architecture**: Separation of concerns for maintainability
2. **Query Builder Pattern**: Reusable query construction logic
3. **Service Layer**: Business logic isolation from HTTP concerns
4. **Server-Side Operations**: All filtering, sorting, and pagination on backend for performance

### Frontend Design Choices

1. **Component Composition**: Small, focused components for reusability
2. **Custom Hooks**: Data fetching logic separation from UI
3. **Controlled Components**: Single source of truth for form state
4. **Type Safety**: TypeScript for compile-time error detection
5. **Functional Components**: Modern React patterns with hooks

### Performance Optimizations

1. **Database Indexes**: Speed up search and filter operations
2. **Server-Side Pagination**: Reduce data transfer and client memory usage
3. **Effect Cleanup**: Prevent memory leaks in React hooks
4. **Debouncing**: Implicit through React state batching

## Scalability Considerations

1. **Stateless Backend**: Easy horizontal scaling
2. **Database Indexes**: Handle large datasets efficiently
3. **Pagination**: Consistent performance regardless of dataset size
4. **Modular Architecture**: Easy to add new features or modify existing ones
5. **Separation of Concerns**: Frontend and backend can scale independently
