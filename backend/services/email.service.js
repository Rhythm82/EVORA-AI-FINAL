import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("❌ EMAIL credentials missing in .env");
}

/* SMTP TRANSPORTER */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

/* VERIFY SMTP CONNECTION */

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP CONNECTION ERROR:", error);
  } else {
    console.log("✅ SMTP SERVER READY");
  }
});

/* SEND BULK EMAILS */

export const sendBulkEmails = async (emails) => {

  console.log("📨 EMAILS RECEIVED:", emails);

  for (const mail of emails) {

    const recipient = mail.to || mail.email;
    const body = mail.body || mail.message;

    if (!recipient) {
      console.log("⚠️ Skipping email - no recipient:", mail);
      continue;
    }

    try {

      const info = await transporter.sendMail({
        from: `"EVORA AI" <${EMAIL_USER}>`,
        to: recipient,
        subject: mail.subject || "No Subject",
        html: body || ""
      });

      console.log("✅ Email sent to:", recipient);
      console.log("📩 Message ID:", info.messageId);

    } catch (err) {

      console.error("❌ MAIL ERROR:", err);

    }
  }
};