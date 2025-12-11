// email.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';
import { emailBodySchema } from '@/validation/email.validation';
import { handleEmail } from '@/services/email.service';

export async function emailController(req: FastifyRequest, res: FastifyReply) {
  const fields: Record<string, unknown> = {};

  //fetching the field data from stream
  for await (const part of req.parts()) {
    if (part.type === 'field') {
      fields[part.fieldname] = part.value;
    }
  }

  console.log('fields:', fields);
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
