import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { sendResultType } from '@/types/email.types';

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null =
  null;

async function getTransporter(): Promise<
  nodemailer.Transporter<SMTPTransport.SentMessageInfo>
> {
  // Avoid creating new transporter each time
  if (transporter) return transporter;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
    tls: { rejectUnauthorized: false },
  } as SMTPTransport.Options);

  return transporter;
}

export async function sendEmail(mail: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<sendResultType> {
  console.log('reached send email function', mail);
  try {
    const transporter = await getTransporter();
    const info = await transporter.sendMail(mail);
    console.log('info has been sent', info);
    return {
      messageId: info.messageId || '',
      accepted: info.accepted as string[],
      rejected: info.rejected as string[],
    };
  } catch (err) {
    console.error('error happened in email.sender', err);
    throw err;
  }
}
