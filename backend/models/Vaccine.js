const mongoose = require('mongoose');

const vaccineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vaccine name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Vaccine name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  dosage: {
    type: String,
    required: [true, 'Dosage information is required'],
    maxlength: [200, 'Dosage information cannot be more than 200 characters']
  },
  availability: {
    type: Date,
    required: [true, 'Availability date is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    maxlength: [200, 'Location cannot be more than 200 characters']
  },
  availableSlots: {
    type: Number,
    required: [true, 'Available slots is required'],
    min: [0, 'Available slots cannot be negative'],
    default: 10
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  ageGroups: {
    type: [String],
    required: [true, 'Age groups are required'],
    enum: ['infant', 'child', 'child_1_5', 'child_5_10', 'adolescent', 'adult', 'senior', 'all'],
    default: ['all']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vaccine', vaccineSchema);

