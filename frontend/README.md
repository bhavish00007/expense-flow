# Frontend - ExpenseFlow

Modern React application built with Vite and Tailwind CSS.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file (optional):
   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features

- 🔐 User authentication (signup/login)
- 📊 Interactive dashboard with charts
- 💰 Income management
- 💸 Expense tracking
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- React 18
- Vite
- React Router DOM
- Axios
- Recharts
- Tailwind CSS
- Lucide React Icons
- date-fns

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
│   ├── Auth/        # Login, SignUp
│   └── Dashboard/   # Dashboard, Income, Expense
├── utils/           # Utilities and helpers
├── App.jsx          # Main app component
├── main.jsx         # Entry point
└── index.css        # Global styles
```

## Environment Variables

The frontend uses Vite's environment variable system. Variables must be prefixed with `VITE_`:

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api/v1)

## Styling

The app uses Tailwind CSS for styling with custom utilities defined in `index.css`.

Key custom classes:
- `.btn-primary` - Primary buttons
- `.btn-secondary` - Secondary buttons
- `.input-field` - Form inputs
- `.card` - Card containers
- `.stat-card` - Statistics cards
