const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  vaccine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vaccine',
    required: [true, 'Vaccine is required']
  },
  bookingDate: {
    type: Date,
    required: [true, 'Booking date is required']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  userInfo: {
    name: {
      type: String,
      required: [true, 'User name is required']
    },
    email: {
      type: String,
      required: [true, 'User email is required']
    },
    phone: {
      type: String,
      required: [true, 'User phone is required']
    }
  },
  vaccineInfo: {
    name: {
      type: String,
      required: [true, 'Vaccine name is required']
    },
    location: {
      type: String,
      required: [true, 'Vaccine location is required']
    }
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance
bookingSchema.index({ user: 1, bookingDate: 1 });
bookingSchema.index({ vaccine: 1, bookingDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);

