import { FastifyInstance } from 'fastify'; //contains the methods and properties of fastify app like post,get...{eq:const app=fastify()}
import { emailController } from '@/controller/email.controller';

export async function emailRoute(app: FastifyInstance) {
  console.log('in email routes the call has happened');
  app.post('/email', emailController);
}
