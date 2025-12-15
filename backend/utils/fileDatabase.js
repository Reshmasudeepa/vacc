const fs = require('fs');
const path = require('path');

class FileDatabase {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.vaccinesFile = path.join(this.dataDir, 'vaccines.json');
    this.bookingsFile = path.join(this.dataDir, 'bookings.json');
    
    // Ensure data directory exists
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
    
    // Initialize files if they don't exist
    this.initializeFiles();
  }

  initializeFiles() {
    if (!fs.existsSync(this.vaccinesFile)) {
      fs.writeFileSync(this.vaccinesFile, '[]');
    }
    if (!fs.existsSync(this.bookingsFile)) {
      fs.writeFileSync(this.bookingsFile, '[]');
    }
  }

  // Vaccines operations
  getVaccines() {
    try {
      const data = fs.readFileSync(this.vaccinesFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading vaccines:', error);
      return [];
    }
  }

  saveVaccines(vaccines) {
    try {
      fs.writeFileSync(this.vaccinesFile, JSON.stringify(vaccines, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving vaccines:', error);
      return false;
    }
  }

  getVaccineById(id) {
    const vaccines = this.getVaccines();
    return vaccines.find(vaccine => vaccine.id === id);
  }

  addVaccine(vaccine) {
    const vaccines = this.getVaccines();
    const newVaccine = {
      ...vaccine,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    vaccines.push(newVaccine);
    this.saveVaccines(vaccines);
    return newVaccine;
  }

  updateVaccine(id, updates) {
    const vaccines = this.getVaccines();
    const index = vaccines.findIndex(vaccine => vaccine.id === id);
    if (index !== -1) {
      vaccines[index] = { ...vaccines[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveVaccines(vaccines);
      return vaccines[index];
    }
    return null;
  }

  deleteVaccine(id) {
    const vaccines = this.getVaccines();
    const filteredVaccines = vaccines.filter(vaccine => vaccine.id !== id);
    this.saveVaccines(filteredVaccines);
    return filteredVaccines.length !== vaccines.length;
  }

  // Bookings operations
  getBookings() {
    try {
      const data = fs.readFileSync(this.bookingsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading bookings:', error);
      return [];
    }
  }

  saveBookings(bookings) {
    try {
      fs.writeFileSync(this.bookingsFile, JSON.stringify(bookings, null, 2));
      return true;
    } catch (error) {
      console.error('Error saving bookings:', error);
      return false;
    }
  }

  getBookingById(id) {
    const bookings = this.getBookings();
    return bookings.find(booking => booking.id === id);
  }

  addBooking(booking) {
    const bookings = this.getBookings();
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    bookings.push(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  }

  updateBooking(id, updates) {
    const bookings = this.getBookings();
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updates, updatedAt: new Date().toISOString() };
      this.saveBookings(bookings);
      return bookings[index];
    }
    return null;
  }

  deleteBooking(id) {
    const bookings = this.getBookings();
    const filteredBookings = bookings.filter(booking => booking.id !== id);
    this.saveBookings(filteredBookings);
    return filteredBookings.length !== bookings.length;
  }

  getBookingsByEmail(email) {
    const bookings = this.getBookings();
    return bookings.filter(booking => booking.userInfo.email === email);
  }
}

module.exports = new FileDatabase();

