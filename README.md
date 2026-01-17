# Inventory Management System

## Overview
This is a small Angular-based inventory management system demonstrating CRUD operations, role-based access control, and dashboard metrics.

## Features
- Users: CRUD (Admin only)
- Roles: CRUD (Admin only)
- Items: CRUD, search, restock (Admin, Supervisor)
- Sales: Sell, restock, search (Admin, Salesperson)
- Dashboard: Total items sold, items sold today, most popular item (Admin, Supervisor)

## Technologies
- Angular v21
- SCSS + Tailwind CSS
- localStorage for data persistence
- Signals for reactive state management

## How to Run
1. Clone the repo
2. `npm install`
3. `ng serve`
4. Navigate to `http://localhost:4200`

## Access Control
- Admin: Full access
- Supervisor: Access to items and dashboard
- Salesperson: Access to sales only


## Technical Details

- **Data Layer:**  
  - All data stored in `localStorage`
  - Services return **Observables** and simulate network latency (500–2500 ms)

- **Angular Features:**  
  - **Signals** for reactive state
  - **Computed signals** for derived metrics
  - Component communication via `@Input` and `@Output`
  - Lazy-loaded routes using `loadComponent`
  - Route guards (`authGuard`) for role-based access

- **Styling:** Tailwind CSS and SCSS. No component libraries used.

---

## Architectural Note
- The system follows MVC pattern.
- Role-based access is enforced via Angular route guards and sidebar menu filtering.
- **Future improvement**: For scaling, I would introduce a backend API with token-based authentication and a proper database instead of localStorage.

## Assumptions
- localStorage simulates the backend for demonstration purposes.
- Salesperson can only access sales; other routes are blocked via guards.
- Metrics are computed based on sales stored in localStorage.

## Author
- **Name:** Subash Pandey
- **Email:** itsmesubashpandey867@gmail.com
