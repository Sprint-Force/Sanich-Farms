import express from "express";
import { sendEmail } from "./mailer.js";

const contact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await sendEmail({
      to: process.env.SENDGRID_FROM_EMAIL,
      subject: subject,
      html: `
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send message." });
  }
};

// Route
export const contactRoute = express.Router();
contactRoute.post("/api/contact", contact);
