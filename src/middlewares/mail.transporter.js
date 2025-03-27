import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS_KEY,
    // user: cred.GMAIL_USER,
    // pass: cred.GMAIL_PASS_KEY,
  },
});

export { transporter };
