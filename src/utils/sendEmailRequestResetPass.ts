import nodemailer from "nodemailer";
import { htmlTemplate } from "../utils/htmlTemplate";

export const sendEmail = async (to: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // atau gunakan SMTP lain
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Reset Password",
    html: htmlTemplate(to, link),
  });
};
