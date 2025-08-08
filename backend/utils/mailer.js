import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// Send email
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"Sanich Farms" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email sending failed");
  }
}; 



// Welcome email
export const welcomeEmailTemplate = (name) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #2a9d8f;">Welcome to Sanich Farms, ${name}!</h2>
        <p style="font-size: 16px; color: #333;">
          We're excited to have you on board. You can now browse our poultry products, book services, and manage your orders easily.
        </p>
        <p style="font-size: 16px; color: #333;">
          If you have any questions, just reply to this email. We're here to help!
        </p>
        <br/>
        <p style="font-size: 16px; color: #2a9d8f;">– The Sanich Farms Team</p>
      </div>
    </div>
  `;
};
