// @desc    Mark a dose as completed
// @route   POST /api/bookings/:id/complete-dose
// @access  Public
const completeDose = async (req, res) => {
  try {
    const { doseIndex } = req.body; // index of the dose to mark as completed
    const booking = db.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (!Array.isArray(booking.doses) || booking.doses.length === 0) {
      return res.status(400).json({ success: false, message: 'No doses to complete for this booking.' });
    }
    if (doseIndex < 0 || doseIndex >= booking.doses.length) {
      return res.status(400).json({ success: false, message: 'Invalid dose index.' });
    }
    // Mark the dose as completed
    booking.doses[doseIndex].completed = true;
    booking.doses[doseIndex].completionDate = new Date().toISOString().slice(0, 10);
    // If all doses are completed, mark booking as completed
    if (booking.doses.every(d => d.completed)) {
      booking.status = 'completed';
    }
    const updated = db.updateBooking(booking.id, booking);
    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error completing dose:', error);
    res.status(500).json({ success: false, message: 'Server error while completing dose' });
  }
};
// Cancel booking controller
const cancelBooking = async (req, res) => {
  try {
    // Find the booking by ID
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    // Mark as cancelled (or delete, depending on your logic)
    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error cancelling booking', error: error.message });
  }
};
const Booking = require('../models/Booking');
const Vaccine = require('../models/Vaccine');
const { sendBookingMail } = require('../utils/mailer');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
const getBookings = async (req, res) => {
  try {
    const { userEmail, status } = req.query;
    let query = {};
    if (userEmail) {
      query['userInfo.email'] = { $regex: userEmail, $options: 'i' };
    }
    if (status && status !== 'all') {
      query.status = status;
    }
    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching bookings'
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Public
const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching booking'
    });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = async (req, res) => {
  try {
    const { vaccine: vaccineId, user, userInfo, bookingDate, notes } = req.body;
    // Fetch vaccine info from DB
    const vaccineDoc = await Vaccine.findById(vaccineId);
    if (!vaccineDoc) {
      return res.status(400).json({ success: false, message: 'Invalid vaccine selected' });
    }
    // Compose vaccineInfo for booking
    const vaccineInfo = {
      name: vaccineDoc.name,
      location: vaccineDoc.location
    };
    const booking = await Booking.create({
      user,
      vaccine: vaccineId,
      bookingDate,
      status: 'pending',
      userInfo,
      vaccineInfo,
      notes
    });
    // Compose mail with vaccine details
    const userEmail = userInfo?.email;
    const subject = 'Vaccine Registration Confirmation';
    let text = `Dear ${userInfo?.name || 'User'},\n\n`;
    text += `You have successfully registered for the following vaccine:\n`;
    text += `- Vaccine: ${vaccineDoc.name}\n- Location: ${vaccineDoc.location}\n- Dosage: ${vaccineDoc.dosage}\n`;
    text += '\nThank you for booking!\n\nYou will receive further updates when your appointment is confirmed.';
    if (userEmail) {
      sendBookingMail(userEmail, subject, text).catch(console.error);
    }

    // --- Auto-complete logic: if all slots are filled, mark bookings as completed ---
    // Count total bookings for this vaccine (excluding cancelled)
    const totalBookings = await Booking.countDocuments({ vaccine: vaccineId, status: { $ne: 'cancelled' } });

    if (totalBookings >= vaccineDoc.availableSlots) {
      // Mark all bookings for this vaccine as completed
      await Booking.updateMany(
        { vaccine: vaccineId, status: { $in: ['pending', 'confirmed'] } },
        { $set: { status: 'completed' } }
      );
      // Set vaccine as inactive (no more slots)
      await Vaccine.findByIdAndUpdate(vaccineId, { isActive: false });
    }

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating booking'
    });
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Public
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating booking'
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Public
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting booking'
    });
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  cancelBooking,
  completeDose
};