# ExpenseFlow – Features

This document gives an overview of the main features available in the ExpenseFlow application.

---

## Dashboard

The dashboard provides a quick summary of the user’s financial status.

**Key information displayed:**

* Current balance (Income – Expenses)
* Total income
* Total expenses
* Savings percentage

**Visual insights**

* Monthly income vs expense comparison
* Expense distribution by category (pie chart)
* Recent income and expense transactions

The charts are responsive and adjust based on screen size.

---

## Income Management

Users can manage all income records from a dedicated section.

**Capabilities**

* Add new income entries
* Edit existing records
* Delete entries
* View income in a card-based layout

**Fields**

* Title
* Amount
* Category
* Date
* Optional description

**Income Categories**

* Salary
* Freelance
* Business
* Investment
* Gift
* Other

---

## Expense Management

Expense management follows the same structure as income for consistency.

**Capabilities**

* Add, edit, and delete expenses
* View expenses in a responsive grid
* Category-wise organization

**Expense Categories**

* Food
* Transportation
* Entertainment
* Shopping
* Healthcare
* Education
* Bills
* Other

---

## Authentication

The application includes a basic authentication system.

**Features**

* User registration
* Login with email and password
* JWT-based authentication
* Protected routes
* Automatic logout when token expires
* Password hashing using bcrypt

---

## Responsive Design

The UI is designed to work across devices.

* **Desktop:** Sidebar navigation and multi-column layout
* **Tablet:** Collapsible sidebar and adjusted layout
* **Mobile:** Single-column view with a menu toggle

---

## User Experience

Some usability features included:

* Form validation and error messages
* Loading states where required
* Confirmation before deleting records
* Smooth navigation between pages

---

## Technical Stack

### Frontend

* React (Vite)
* React Router
* Axios
* Tailwind CSS
* Recharts
* date-fns

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

## Data & Calculations

The system automatically calculates:

* Total income
* Total expenses
* Balance
* Savings percentage
* Monthly summaries
* Category totals

---

## Possible Future Improvements

Some features that can be added later:

* Budget limits
* Recurring transactions
* Export reports (CSV/PDF)
* Notifications or reminders
* Dark mode
* Multiple currencies

---

## Customization

The project is easy to modify:

* Colors and theme via Tailwind config
* Categories via constants
* UI components can be extended
* New pages or charts can be added

---

This project was built as a full-stack expense tracking application with a focus on clean structure, usability, and scalability.
