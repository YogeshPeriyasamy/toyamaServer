import { buildApp } from '@/app';
import * as dotEnv from 'dotenv';

dotEnv.config();

(async () => {
  try {
    const port = process.env.PORT;

    const app = await buildApp();
    await app.listen({ port: Number(port), host: '127.0.0.1' });

    console.log(`server running in port ${port}`);
  } catch (err) {
    console.log('Server startup failed');
  }
})();
