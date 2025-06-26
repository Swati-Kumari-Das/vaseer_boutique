
const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,       // your admin email
        pass: process.env.ADMIN_EMAIL_PASS,  // app password (not normal Gmail password)
      },
    });

    const mailOptions = {
      from: `"Vaseer Boutique" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
};

module.exports = sendEmail;
