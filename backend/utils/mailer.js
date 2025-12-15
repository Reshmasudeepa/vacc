const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


function sendBookingMail(to, subject, text) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text
  };
  return transporter.sendMail(mailOptions);
}

// Send contact form message to admin
function sendContactMail(name, email, subject, message) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.MAIL_USER,
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendBookingMail, sendContactMail };
