import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { emailRoute } from '@/routes/email.route';
import multipart from '@fastify/multipart';

export async function buildApp() {
  const origin = process.env.ORIGIN;

  const app = fastify({ logger: false });
  await app.register(helmet);
  await app.register(cors, { origin: origin, methods: ['POST'] });
  await app.register(multipart);
  await app.register(emailRoute);

  return app;
}
