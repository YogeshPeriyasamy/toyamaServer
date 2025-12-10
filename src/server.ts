import { buildApp } from '@/app';
import * as dotEnv from 'dotenv';

dotEnv.config();

(async () => {
  try {
    const port = process.env.PORT;

    const app = await buildApp();
    await app.listen({ port: Number() });

    console.log('server running in port 8080');
  } catch (err) {
    console.log('Server startup failed');
  }
})();
