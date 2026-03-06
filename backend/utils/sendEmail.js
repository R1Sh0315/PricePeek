const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Use a console transporter if credentials are not provided (for USER convenience)
  // Or Ethereal for a testable fake inbox
  let transporter;
  
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
  } else {
      // Create a test account if no real one is in .env
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, 
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
      });
      console.log('Ethereal Email Preview URL:', nodemailer.getTestMessageUrl());
  }

  const message = {
    from: `${process.env.FROM_NAME || 'PricePeek India'} <${process.env.FROM_EMAIL || 'alerts@pricepeek.in'}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log('Message sent: %s', info.messageId);
  if (!process.env.SMTP_HOST) {
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
};

module.exports = sendEmail;
