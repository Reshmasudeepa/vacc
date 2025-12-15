// Script to send automatic vaccine dose reminders
const { sendReminders } = require('../utils/reminderScheduler');

(async () => {
  await sendReminders();
  process.exit(0);
})();
