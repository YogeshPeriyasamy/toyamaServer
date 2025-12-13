import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import multipart from '@fastify/multipart';
import fastifyCookie from '@fastify/cookie';
import fastifyCsrf from '@fastify/csrf-protection';
import { emailRoute } from '@/routes/email.route';
import { csrfRoute } from './routes/csrf.route';

export async function buildApp() {
  const origin = process.env.ORIGIN;

  const app = fastify({ logger: false });
  await app.register(helmet);
  await app.register(cors, { origin: origin, methods: ['POST'] });
  await app.register(fastifyCookie, { secret: 'supersecret' });
  await app.register(fastifyCsrf, {
    cookieOpts: { path: '/', sameSite: true },
  });
  await app.register(multipart);
  await app.register(emailRoute);
  await app.register(csrfRoute);

  return app;
}
