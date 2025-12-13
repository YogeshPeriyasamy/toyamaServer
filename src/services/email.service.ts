import fs from 'node:fs';
import path from 'node:path';
import { sendResultType } from '@/types/email.types';
import { emailType } from '@/validation/email.validation';
import { sendEmail } from './mailer/email.sender';

//to stop the injection
function escapeHtml(s: string) {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[
        c
      ] as string)
  );
}

export async function handleEmail(payload: emailType): Promise<sendResultType> {
  //load html template
  const htmlPath = path.join(
    __dirname,
    '..',
    'templates',
    'contactRequest.html'
  );

  let html = fs.readFileSync(htmlPath, 'utf8');
  const { name, email, phone, country, city, message, subject } = payload;

  //html to send in mail
  html = html
    .replace(/{{\s*name\s*}}/g, escapeHtml(name))
    .replace(/{{\s*email\s*}}/g, escapeHtml(email))
    .replace(/{{\s*phone\s*}}/g, escapeHtml(phone ?? ''))
    .replace(/{{\s*message\s*}}/g, escapeHtml(message))
    .replace(/{{\s*city\s*}}/g, escapeHtml(city))
    .replace(/{{\s*country\s*}}/g, escapeHtml(country));

  const text =
    `New contact request\n` +
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? ''}\n\n${message}\n`;

  return sendEmail({
    from: process.env.MAIL_FROM || 'Toyama <no-reply@toyama.local>',
    to: process.env.MAIL_TO!,
    subject,
    html,
    text,
  });
}
