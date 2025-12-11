import fs from 'node:fs';
import path from 'node:path';
import { sendResultType } from '@/types/email.types';
import { emailType } from '@/validation/email.validation';
import { sendEmail } from './mailer/email.sender';

export async function handleEmail(payload: emailType):Promise<sendResultType> {

}
