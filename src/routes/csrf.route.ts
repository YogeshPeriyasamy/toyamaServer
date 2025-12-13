import { FastifyInstance } from 'fastify'; //contains the methods and properties of fastify app like post,get...{eq:const app=fastify()}
import { generatecsrf } from '@/controller/csrf.controller';

export async function csrfRoute(app: FastifyInstance) {
  app.get('/fetchCsrfToken', generatecsrf);
}
