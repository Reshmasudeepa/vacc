# Vaccination Booking System

A comprehensive vaccination booking system built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Home Page**: Clean landing page with navigation
- **Vaccines Module**: Browse available vaccines with search/filter
- **Booking Module**: Book vaccination appointments
- **My Bookings**: View and manage your bookings
- **Admin Module**: Manage vaccines and availability

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, React Router, Bootstrap
- **Database**: MongoDB

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

This will start both the backend server (port 5000) and frontend development server (port 3000).

## Project Structure

```
vaccination-booking-system/
├── backend/           # Node.js/Express backend
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── controllers/  # Route controllers
│   └── server.js     # Main server file
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/      # Page components
│   │   └── services/   # API services
└── package.json
```

## API Endpoints

### Vaccines
- `GET /api/vaccines` - Get all vaccines
- `POST /api/vaccines` - Add new vaccine (admin)
- `PUT /api/vaccines/:id` - Update vaccine (admin)
- `DELETE /api/vaccines/:id` - Delete vaccine (admin)

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Cancel booking

## Database Schema

### User
- name: String
- email: String
- phone: String

### Vaccine
- name: String
- description: String
- availability: Date
- location: String

### Booking
- user: ObjectId (ref: User)
- vaccine: ObjectId (ref: Vaccine)
- bookingDate: Date
- status: String

