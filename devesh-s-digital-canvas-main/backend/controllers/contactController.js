const nodemailer = require('nodemailer');

let transporter;
let senderEmail;
let usingEthereal = false;

// Initialize transporter once and reuse it for all requests.
async function createTransporter() {
  if (transporter) return transporter;

  const { EMAIL_USER, EMAIL_PASS } = process.env;

  if (EMAIL_USER && EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    senderEmail = EMAIL_USER;
    return transporter;
  }

  // Development fallback to Ethereal if env vars are missing.
  usingEthereal = true;
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  senderEmail = testAccount.user;

  console.warn(
    'No EMAIL_USER/EMAIL_PASS found — using Ethereal test account for development. Messages will not reach a real inbox.'
  );

  return transporter;
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleContactSubmission(req, res) {
  try {
    await createTransporter();

    const { name, email, subject, message } = req.body || {};

    // Validate required fields.
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const mailOptions = {
      from: senderEmail,
      to: process.env.EMAIL_TO || senderEmail,
      subject: `New Portfolio Contact - ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact controller error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Unable to send message. Please try again later.' });
  }
}

createTransporter()
  .then(() => transporter.verify())
  .then(() => console.log('Email transporter is ready.'))
  .catch((error) => {
    console.error('Failed to initialize email transporter:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });

module.exports = { handleContactSubmission };
