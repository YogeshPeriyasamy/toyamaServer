// email.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaClient } from '@/generated/prisma';
import { emailBodySchema } from '@/validation/email.validation';
import { handleEmail } from '@/services/email.service';

const prisma = new PrismaClient();

export async function emailController(req: FastifyRequest, res: FastifyReply) {
  const fields: Record<string, unknown> = {};

  //fetching the field data from stream
  for await (const part of req.parts()) {
    if (part.type === 'field') {
      fields[part.fieldname] = part.value;
    }
  }

  const parsedFields = emailBodySchema.safeParse(fields);

  //edgecase the form data is invalid
  if (!parsedFields.success) {
    console.log('error occured while parsinng the data', parsedFields.error);
    return res.code(400).send({ status: 'Error', error: 'Invalid form data' });
  }

  //fetch the validated data from zod
  const payload = parsedFields.data;

  try {
    await handleEmail(payload);

    // add email in the emails table
    const savedEmail = await prisma.emails.create({
      data: {
        name: payload.name,
        email: payload.email,
        country: payload.country,
        city: payload.city,
        phone: payload.phone,
        subject: payload.subject,
        message: payload.message,
      },
    });
    console.log('Email saved successfully:', savedEmail);
    return res
      .code(200)
      .send({ status: 'success', message: 'Mail sent successfully' });
  } catch (err) {
    console.log('Error while sening email', err);
    return res
      .code(500)
      .send({ status: 'Error', error: 'Internal server error' });
  }
}
