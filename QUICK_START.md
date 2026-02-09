# 🚀 Quick Start Guide - ExpenseFlow

## Prerequisites Checklist

Before you begin, make sure you have:
- ✅ Node.js installed (v14 or higher) - [Download](https://nodejs.org/)
- ✅ MongoDB installed OR MongoDB Atlas account - [Get MongoDB](https://www.mongodb.com/)
- ✅ A code editor (VS Code recommended)
- ✅ Terminal/Command Prompt access

## 📦 Step-by-Step Setup

### Step 1: Extract the Project
Extract the `complete-expense-tracker.zip` file to your desired location.

### Step 2: Setup Backend (API Server)

1. **Navigate to backend folder:**
   ```bash
   cd complete-expense-tracker/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages (Express, MongoDB, JWT, etc.)

3. **Configure MongoDB:**
   
   **Option A - Local MongoDB:**
   - Make sure MongoDB is running on your computer
   - The default connection string in `.env` is: `mongodb://localhost:27017/expense-tracker`
   
   **Option B - MongoDB Atlas (Cloud):**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Update `MONGODB_URI` in `.env` file with your connection string

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   🚀 Server running on port 5000
   📊 Environment: development
   MongoDB Connected: localhost
   ```

✅ **Backend is now running on http://localhost:5000**

### Step 3: Setup Frontend (React App)

1. **Open a NEW terminal window** (keep backend running)

2. **Navigate to frontend folder:**
   ```bash
   cd complete-expense-tracker/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install React, Vite, Tailwind CSS, etc.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   VITE v5.0.8  ready in 500 ms
   
   ➜  Local:   http://localhost:5173/
   ```

✅ **Frontend is now running on http://localhost:5173**

### Step 4: Use the Application

1. **Open your browser** and go to: `http://localhost:5173`

2. **Create an account:**
   - Click "Create one now"
   - Fill in your name, email, and password
   - Click "Create Account"

3. **You're in!** Start tracking your finances:
   - View your dashboard
   - Add income transactions
   - Add expenses
   - See beautiful charts and statistics

## 🎯 Quick Feature Tour

### Dashboard
- Overview of your total balance, income, and expenses
- Monthly trend chart
- Expense category breakdown
- Recent transactions

### Income Page
- Click "Add Income" to record income
- Choose from categories: Salary, Freelance, Business, Investment, Gift, Other
- Edit or delete existing income entries

### Expenses Page
- Click "Add Expense" to record spending
- Choose from categories: Food, Transportation, Entertainment, Shopping, Healthcare, Education, Bills, Other
- Edit or delete existing expense entries

## 🔧 Troubleshooting

### Backend won't start
- **Error: "EADDRINUSE"** - Port 5000 is already in use
  - Solution: Change PORT in `.env` to 5001 or kill the process using port 5000
  
- **Error: "Failed to connect to MongoDB"**
  - Solution: Make sure MongoDB is running (local) or check your connection string (Atlas)

### Frontend won't start
- **Error: "EADDRINUSE"** - Port 5173 is already in use
  - Solution: The server will automatically use the next available port

### Can't login/signup
- **Error: "Network Error"**
  - Solution: Make sure backend is running on http://localhost:5000
  - Check that there are no CORS errors in browser console

### MongoDB Connection Issues
- Make sure MongoDB service is running
- For MongoDB Atlas: Whitelist your IP address in Atlas dashboard
- Check your internet connection if using Atlas

## 📝 Default Configuration

### Backend (`.env` file)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=expense_tracker_secret_key_change_in_production_2024
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### API Base URL
The frontend automatically connects to: `http://localhost:5000/api/v1`

## 🌐 Testing the API

You can test the API using tools like:
- Postman
- Thunder Client (VS Code extension)
- curl

Example API call:
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'
```

## 📱 What You Get

### Frontend Features
✅ Beautiful modern UI with Tailwind CSS
✅ Responsive design (works on mobile, tablet, desktop)
✅ Interactive charts (Recharts library)
✅ Smooth animations and transitions
✅ User-friendly forms with validation

### Backend Features
✅ RESTful API architecture
✅ JWT authentication & authorization
✅ Password hashing with bcrypt
✅ MongoDB database with Mongoose ODM
✅ Error handling and validation
✅ CORS enabled

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js` to customize the color scheme.

### Add New Categories
Edit `frontend/src/utils/constants.js` to add expense/income categories.

### Modify Port Numbers
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change port in `frontend/vite.config.js`

## 📚 Project Structure

```
complete-expense-tracker/
├── backend/              # Node.js + Express API
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication
│   └── server.js        # Entry point
│
└── frontend/            # React + Vite
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── utils/       # Helpers & API
    │   └── App.jsx      # Main app
    └── index.html       # HTML template
```

## 🚀 Next Steps

1. **Customize the app** - Add your own features!
2. **Deploy to production** - Use services like:
   - Backend: Heroku, Railway, Render
   - Frontend: Vercel, Netlify
   - Database: MongoDB Atlas
3. **Add more features** - Ideas:
   - Budget goals
   - Recurring transactions
   - Export to CSV/PDF
   - Email notifications
   - Multi-currency support

## 💡 Tips for Success

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check the console** - Look for any error messages
3. **Use MongoDB Compass** - Visual tool to view your database
4. **Install extensions** - ES7 React snippets, Tailwind CSS IntelliSense for VS Code

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments in the source files
- Test API endpoints using Postman
- Check MongoDB connection in MongoDB Compass

## ✅ Success Checklist

Before considering setup complete:
- [ ] Backend server is running (http://localhost:5000)
- [ ] Frontend dev server is running (http://localhost:5173)
- [ ] MongoDB is connected (check backend console)
- [ ] You can create an account
- [ ] You can login successfully
- [ ] Dashboard loads with initial state
- [ ] You can add an income entry
- [ ] You can add an expense entry
- [ ] Charts are displaying correctly

---

**🎉 Congratulations!** You now have a fully functional ExpenseFlow application!

Start by creating an account and adding some transactions to see the app in action!
