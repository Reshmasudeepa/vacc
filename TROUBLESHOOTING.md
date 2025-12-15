# Vaccination Booking System - Troubleshooting Guide

## Quick Start

### Option 1: Use the Batch File (Windows)
1. Double-click `start.bat`
2. Wait for both servers to start
3. Open http://localhost:3000 in your browser

### Option 2: Manual Start

#### Start Backend:
```bash
cd backend
npm install
npm run seed  # Seed the database with sample data
npm run dev   # Start backend server on port 5000
```

#### Start Frontend (in a new terminal):
```bash
cd frontend
npm install
npm start     # Start frontend server on port 3000
```

## Common Issues & Solutions

### 1. "Cannot find module" errors
**Solution:** Run `npm install` in both backend and frontend directories

### 2. MongoDB connection errors
**Solution:** 
- Make sure MongoDB is installed and running
- For Windows: Start MongoDB service or run `mongod`
- For macOS: `brew services start mongodb-community`
- For Linux: `sudo systemctl start mongod`

### 3. Port already in use errors
**Solution:**
- Kill processes using ports 3000 or 5000
- Windows: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
- macOS/Linux: `lsof -ti:3000 | xargs kill -9`

### 4. Frontend not loading
**Solution:**
- Check if backend is running on port 5000
- Check browser console for errors
- Try clearing browser cache

### 5. API calls failing
**Solution:**
- Verify backend is running: http://localhost:5000/api/health
- Check CORS settings in backend
- Verify proxy setting in frontend/package.json

## Testing the Application

### 1. Test Backend API
Open these URLs in your browser:
- http://localhost:5000/api/health
- http://localhost:5000/api/vaccines
- http://localhost:5000/api/bookings

### 2. Test Frontend
- Open http://localhost:3000
- Try navigating to different pages
- Test the age group selection
- Try booking a vaccine

### 3. Test Database
- Check if vaccines are loaded: http://localhost:5000/api/vaccines
- Should return an array of vaccine objects

## Features to Test

### 1. Home Page
- Clean landing page with navigation
- Call-to-action buttons

### 2. Vaccines Page
- Age group selection (cards with icons)
- Search and filter functionality
- Vaccine details display
- Book Now button for each vaccine

### 3. Booking Process
- Click "Book Now" on any vaccine
- Modal opens with vaccine details
- Form auto-fills for logged-in users
- Registration form for guests

### 4. User Authentication
- Sign up: http://localhost:3000/signup
- Login: http://localhost:3000/login
- Dashboard: http://localhost:3000/dashboard (after login)

### 5. My Bookings
- View all bookings by email
- Cancel bookings
- Status tracking

### 6. Admin Panel
- Add/edit/delete vaccines
- View booking statistics
- Manage vaccine availability

## Database Schema

### Vaccines Collection
- name, description, dosage
- availability (date), location
- availableSlots, price
- ageGroups, isActive

### Bookings Collection
- userInfo (name, email, phone)
- vaccineInfo (name, location)
- bookingDate, status, notes

## Environment Variables

Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vaccination_booking
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Logs and Debugging

### Backend Logs
- Check terminal where backend is running
- Look for MongoDB connection messages
- Check for API request logs

### Frontend Logs
- Open browser Developer Tools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

## Reset Everything

If you need to start fresh:
1. Stop both servers (Ctrl+C)
2. Delete `node_modules` in both directories
3. Run `npm install` in both directories
4. Run `npm run seed` in backend
5. Start both servers again

## Support

If you're still having issues:
1. Check the terminal output for error messages
2. Check browser console for JavaScript errors
3. Verify all dependencies are installed
4. Make sure MongoDB is running
5. Check that ports 3000 and 5000 are available
