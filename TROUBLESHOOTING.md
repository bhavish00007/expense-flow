# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### Backend Issues

#### 1. MongoDB Connection Failed

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
- Make sure MongoDB is installed and running
- For Windows: Check Services and start MongoDB
- For Mac: Run `brew services start mongodb-community`
- For Linux: Run `sudo systemctl start mongod`
- Or use MongoDB Atlas (cloud) instead

**MongoDB Atlas Setup:**
1. Go to mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for testing)
5. Get connection string
6. Update MONGODB_URI in backend/.env

#### 2. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
- Change PORT in backend/.env to 5001 or another port
- Kill the process using port 5000:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - Mac/Linux: `lsof -ti:5000 | xargs kill -9`

#### 3. JWT Secret Not Defined

**Error:**
```
Error: JWT_SECRET is not defined
```

**Solution:**
- Make sure .env file exists in backend folder
- Check that JWT_SECRET is set in .env
- Restart the server after creating/updating .env

#### 4. Missing Dependencies

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
cd backend
npm install
```

### Frontend Issues

#### 1. Can't Connect to Backend

**Error in browser console:**
```
Network Error
```

**Solutions:**
- Make sure backend is running on http://localhost:5000
- Check if backend .env has correct CLIENT_URL
- Open http://localhost:5000/api/health in browser to test
- Check for CORS errors in console

#### 2. Blank Page After Build

**Solution:**
- Clear browser cache
- Check browser console for errors
- Make sure all dependencies installed: `npm install`
- Try deleting node_modules and package-lock.json, then `npm install` again

#### 3. Tailwind Styles Not Working

**Solution:**
- Make sure you ran `npm install`
- Check that postcss.config.js and tailwind.config.js exist
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again

#### 4. Recharts Not Displaying

**Solution:**
- Make sure recharts is installed: `npm install recharts`
- Check browser console for errors
- Verify data is being fetched from API

### Authentication Issues

#### 1. Can't Login After Signup

**Solutions:**
- Check browser console for errors
- Make sure backend is running
- Verify user was created in MongoDB
- Check if email is correct
- Try with a new email address

#### 2. Token Expired Error

**Solution:**
- Clear localStorage: Open browser console and run `localStorage.clear()`
- Login again
- Token expiration is set to 30 days in backend

#### 3. Unauthorized Error

**Solution:**
- Clear localStorage and login again
- Check if token is being sent in request headers
- Verify JWT_SECRET is same in backend .env

### Data Issues

#### 1. Transactions Not Saving

**Solutions:**
- Check browser console and network tab for errors
- Verify backend is running
- Check MongoDB connection
- Look at backend console for validation errors

#### 2. Dashboard Shows No Data

**Solutions:**
- Add some income and expense transactions first
- Refresh the page
- Check network tab to see if API calls are successful
- Verify you're logged in as the correct user

#### 3. Charts Not Updating

**Solution:**
- Refresh the page
- Check if API call to /api/v1/dashboard/stats is successful
- Clear browser cache

## Installation Issues

### npm install fails

**Solutions:**
- Delete node_modules folder and package-lock.json
- Clear npm cache: `npm cache clean --force`
- Run `npm install` again
- Try using `npm install --legacy-peer-deps`

### Permission Denied Errors (Mac/Linux)

**Solution:**
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### Module Not Found After Install

**Solution:**
- Make sure you're in the correct directory (backend or frontend)
- Check package.json to see if dependency is listed
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## Browser Compatibility

### Recommended Browsers
✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)

### Clear Browser Data
If experiencing issues:
1. Open browser settings
2. Clear browsing data
3. Select "Cookies and cached images"
4. Restart browser

## Environment Issues

### Windows

**Node/npm Not Recognized:**
- Reinstall Node.js from nodejs.org
- Make sure "Add to PATH" is checked during installation
- Restart terminal after installation

**MongoDB Not Found:**
- Download from mongodb.com/try/download/community
- Install as Windows Service
- Start via Services app

### Mac

**Command Not Found:**
```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
```

### Linux

**Permission Issues:**
```bash
# Add user to required groups
sudo usermod -aG docker $USER
sudo chown -R $USER:$USER ~/.npm
```

## Development Tools

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- MongoDB for VS Code

### MongoDB Compass
- Download from mongodb.com/products/compass
- Connect to: `mongodb://localhost:27017`
- View database: `expense-tracker`

### Postman
- Test API endpoints
- Import collection from docs
- Check request/response

## Debugging Tips

### Backend Debugging
```bash
# Enable detailed logging
NODE_ENV=development npm run dev

# Check specific route
curl http://localhost:5000/api/health
curl http://localhost:5000/api/v1/auth/register -X POST -H "Content-Type: application/json" -d '{"fullName":"Test","email":"test@test.com","password":"test123"}'
```

### Frontend Debugging
```javascript
// Add to components
console.log('State:', state);
console.log('Props:', props);

// Check API responses
// Open Network tab in browser DevTools
```

### Database Debugging
```bash
# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use expense-tracker
use expense-tracker

# Show collections
show collections

# Find all users
db.users.find()

# Find all incomes
db.incomes.find()

# Find all expenses
db.expenses.find()
```

## Performance Issues

### Slow Loading

**Solutions:**
- Check internet connection
- Clear browser cache
- Check MongoDB connection speed
- Use MongoDB Atlas for better performance
- Enable compression in backend

### High Memory Usage

**Solutions:**
- Close unused browser tabs
- Restart development servers
- Check for memory leaks in code
- Use production build instead of dev build

## Still Having Issues?

### Checklist
- [ ] Node.js version 14 or higher
- [ ] MongoDB is running
- [ ] Both backend and frontend are running
- [ ] .env file exists with correct values
- [ ] Dependencies installed (npm install)
- [ ] No firewall blocking ports 5000 or 5173
- [ ] Browser cache cleared
- [ ] Using a supported browser

### Log Files
Check these for detailed errors:
- Backend console output
- Browser console (F12)
- MongoDB logs
- Network tab in browser DevTools

### Reset Everything
If all else fails:
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend (in new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev

# MongoDB
# Drop database and start fresh
mongosh
use expense-tracker
db.dropDatabase()
```

---

**Most issues can be solved by:**
1. Making sure MongoDB is running
2. Checking both servers are running
3. Clearing browser cache
4. Reinstalling dependencies
