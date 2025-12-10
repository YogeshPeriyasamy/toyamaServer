// email.controller.ts
import type { FastifyRequest, FastifyReply } from 'fastify';

export async function emailController(req: FastifyRequest, res: FastifyReply) {
  console.log('controller called');

  const fields: Record<string, unknown> = {};

  for await (const part of req.parts()) {
    if (part.type === 'field') {
      fields[part.fieldname] = part.value;
    }
  }

  console.log('fields:', fields);
}
