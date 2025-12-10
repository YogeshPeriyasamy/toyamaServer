import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

export async function buildApp() {
  const app = fastify({ logger: true });
  await app.register(helmet);
  await app.register(cors, { origin: process.env.ORIGIN });

  console.log('client origin', process.env.ORIGIN);

  return app;
}
