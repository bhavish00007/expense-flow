# Backend - ExpenseFlow API

RESTful API built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Configure environment variables in `.env`

4. Start MongoDB (if running locally)

5. Run the server:
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Required
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing
- dotenv - Environment variables
