import nodemailer from "nodemailer";
import { config } from "dotenv";
config({ path: "./config.env" });

export const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      service: process.env.SMTP_SERVICE || undefined,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: options.email,
      subject: options.subject,
       html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f4f4f4; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <div style="background: #1a1a1a; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">💪 FitZone Gym</h1>
        <p style="margin: 0; font-size: 14px;">Where Fitness Meets Passion</p>
      </div>

      <div style="background: white; padding: 20px;">
        <h2 style="color: #1a1a1a;">New Message Received</h2>
        <p style="font-size: 16px; color: #555;">${options.message}</p>

        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">

        <p style="font-size: 14px; color: #888;">Sent by: <strong>${options.userEmail}</strong></p>
      </div>

      <div style="background: #1a1a1a; color: white; text-align: center; padding: 15px; border-radius: 0 0 10px 10px;">
        <p style="margin: 0; font-size: 12px;">&copy; ${new Date().getFullYear()} FitZone Gym. All rights reserved.</p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Email could not be sent");
  }
};
