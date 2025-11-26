import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const fromName = process.env.SMTP_FROM_NAME || "Royal Restro";
const fromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;

if (!smtpHost || !smtpUser || !smtpPassword || !fromEmail) {
  console.error("SMTP environment variables are not fully configured.");
}

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
});

export type SupportedLanguage = "en" | "fr";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  if (!smtpHost || !smtpUser || !smtpPassword || !fromEmail) {
    console.error("SMTP is not configured. Email will not be sent.");
    return;
  }

  await transporter.sendMail({
    from: `${fromName} <${fromEmail}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    replyTo: options.replyTo,
  });
}
