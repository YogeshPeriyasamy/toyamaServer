import type { FastifyRequest, FastifyReply } from 'fastify';

export async function generatecsrf(
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {
  const token = await res.generateCsrf();
  console.log('csrf token has been fetched', token);
  res.send({ csrfToken: token });
}
