import { z } from 'zod';

export const emailBodySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  country: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  phone: z.string().min(10).max(20),
  subject: z.string().min(5).max(100),
  message: z.string().min(10).max(1000),
  company: z.string().optional().default(''),
  access_key: z.uuid(),
});

export type emailType = z.infer<typeof emailBodySchema>;
