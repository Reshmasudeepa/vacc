# Vaccination Booking System - Setup Guide

This guide will help you set up and run the Vaccination Booking System on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (version 4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd vaccination-booking-system
```

### 2. Install Dependencies

Install all dependencies for both backend and frontend:

```bash
npm run install-all
```

Or install them separately:

```bash
# Install backend dependencies
npm run install-server

# Install frontend dependencies
npm run install-client
```

### 3. Set Up MongoDB

#### Option A: Local MongoDB Installation
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in `backend/config/database.js`

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env
```

Add the following content to `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vaccination_booking
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 5. Seed the Database

Populate the database with sample vaccine data:

```bash
cd backend
npm run seed
```

This will create sample vaccines in your database.

### 6. Start the Application

#### Development Mode (Recommended)
Start both backend and frontend simultaneously:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

#### Manual Start
If you prefer to start them separately:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Usage

### 1. Access the Application

Open your browser and navigate to `http://localhost:3000`

### 2. Available Features

#### For Users:
- **Home Page**: Landing page with system overview
- **Vaccines**: Browse available vaccines with search and filter
- **Book Appointment**: Create new vaccination appointments
- **My Bookings**: View and manage your bookings
- **Contact**: Contact form and information

#### For Admins:
- **Admin Dashboard**: Manage vaccines and view statistics
- Add, edit, and delete vaccines
- View booking statistics
- Monitor system activity

### 3. Sample Data

The system comes with pre-loaded sample vaccines:
- COVID-19 (Pfizer & Moderna)
- Polio Vaccine
- Hepatitis A & B
- Influenza (Flu Shot)
- MMR Vaccine
- Tdap Vaccine
- Varicella (Chickenpox)
- HPV Vaccine

## API Endpoints

### Vaccines
- `GET /api/vaccines` - Get all vaccines
- `GET /api/vaccines/:id` - Get single vaccine
- `POST /api/vaccines` - Create vaccine (admin)
- `PUT /api/vaccines/:id` - Update vaccine (admin)
- `DELETE /api/vaccines/:id` - Delete vaccine (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get single booking
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/email/:email` - Get user by email

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running on your system.

#### 2. Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill the process using the port or change the port in your `.env` file.

#### 3. Frontend Build Errors
```
Module not found: Can't resolve 'react-router-dom'
```
**Solution**: Make sure all dependencies are installed:
```bash
cd frontend
npm install
```

#### 4. CORS Issues
If you encounter CORS errors, make sure the backend is running on port 5000 and the frontend proxy is configured correctly in `frontend/package.json`.

### Database Issues

#### Reset Database
To clear all data and reseed:
```bash
cd backend
npm run seed
```

#### Check Database Connection
```bash
cd backend
node -e "require('./config/database').then(() => console.log('Connected!'))"
```

## Development

### Project Structure
```
vaccination-booking-system/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── scripts/           # Database seeding scripts
│   └── server.js          # Main server file
├── frontend/              # React frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.js        # Main App component
│   └── package.json
└── package.json          # Root package.json
```

### Adding New Features

1. **Backend**: Add new routes in `backend/routes/`, controllers in `backend/controllers/`
2. **Frontend**: Add new components in `frontend/src/components/`, pages in `frontend/src/pages/`
3. **Database**: Add new models in `backend/models/`

### Code Style

- Use ES6+ features
- Follow RESTful API conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Handle errors gracefully

## Production Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in your environment
2. Use a process manager like PM2
3. Set up proper logging
4. Configure HTTPS
5. Use environment variables for sensitive data

### Frontend Deployment
1. Build the production version: `npm run build`
2. Serve the `build` folder with a web server
3. Configure proper routing for SPA
4. Set up CDN for static assets

### Database
1. Use MongoDB Atlas for production
2. Set up proper backup strategies
3. Configure monitoring and alerts
4. Use connection pooling

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the console logs for error messages
3. Ensure all dependencies are properly installed
4. Verify MongoDB is running and accessible

## License

This project is licensed under the MIT License.

