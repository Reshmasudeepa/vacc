const Booking = require('../models/Booking');
const { sendBookingMail } = require('./mailer');

// How many days before the dose to send a reminder
const REMINDER_DAYS_BEFORE = 1;

async function getUpcomingReminders() {
  const today = new Date();
  const bookings = await Booking.find({});
  const reminders = [];

  bookings.forEach(booking => {
    if (!booking.doses || !Array.isArray(booking.doses)) return;
    booking.doses.forEach((dose, idx) => {
      if (dose.completed) return;
      const scheduledDate = new Date(dose.scheduledDate);
      const diffDays = Math.ceil((scheduledDate - today) / (1000 * 60 * 60 * 24));
      if (diffDays === REMINDER_DAYS_BEFORE) {
        reminders.push({ booking, dose, doseIndex: idx });
      }
    });
  });
  return reminders;
}

async function sendReminders() {
  const reminders = await getUpcomingReminders();
  for (const { booking, dose, doseIndex } of reminders) {
    const userEmail = booking.userInfo?.email;
    if (!userEmail) continue;
    const subject = `Vaccination Reminder: ${dose.label} for ${booking.vaccineInfo?.name}`;
    const text = `Dear ${booking.userInfo?.name || 'User'},\n\nThis is a reminder for your upcoming vaccine dose:\n\n- Vaccine: ${booking.vaccineInfo?.name}\n- Dose: ${dose.label}\n- Scheduled Date: ${dose.scheduledDate}\n\nPlease visit your selected center on the scheduled date.\n\nIf you have already completed this dose, you can mark it as completed in your dashboard.\n\nStay healthy!`;
    try {
      await sendBookingMail(userEmail, subject, text);
      console.log(`Reminder sent to ${userEmail} for ${dose.label} (${dose.scheduledDate})`);
    } catch (err) {
      console.error('Failed to send reminder:', err);
    }
  }
}

module.exports = { sendReminders };
