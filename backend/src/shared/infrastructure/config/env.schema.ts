import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  CORS_ORIGIN: z.url({ protocol: /^https?$/ }),
  CORS_CREDENTIALS: z.enum(['true', 'false']).transform((value) => value === 'true'),
});

export type Env = z.infer<typeof envSchema>;