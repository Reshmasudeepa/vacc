const express = require('express');
const router = express.Router();
const { sendContactMail } = require('../utils/mailer');

// @route   POST /api/contact
// @desc    Send contact form message to admin email
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    await sendContactMail(name, email, subject, message);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
});

module.exports = router;
