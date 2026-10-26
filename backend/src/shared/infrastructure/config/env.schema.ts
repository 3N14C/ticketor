import { z } from 'zod';

const positiveInt = z.coerce.number().int().positive();
const secret = z.string().min(32, 'must be at least 32 characters');
const path = z.string().startsWith('/', 'must start with "/"');

export const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().int().min(1).max(65535),
    // number of reverse proxies in front of the app; 0 = none (never use "true": clients could spoof their IP)
    TRUST_PROXY: z.coerce.number().int().min(0).default(0),
    DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
    REDIS_URL: z.url({ protocol: /^rediss?$/ }),

    CORS_ORIGIN: z.url({ protocol: /^https?$/ }),
    CORS_CREDENTIALS: z.enum(['true', 'false']).transform((value) => value === 'true'),

    JWT_ACCESS_SECRET: secret,
    JWT_ACCESS_EXPIRES_IN: positiveInt,
    JWT_REFRESH_SECRET: secret,
    JWT_REFRESH_EXPIRES_IN: positiveInt,

    COOKIE_PATH: path,
    COOKIE_REFRESH_PATH: path,
    COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']),

    THROTTLE_TTL: positiveInt,
    THROTTLE_LIMIT: positiveInt,
  })
  .superRefine((env, ctx) => {
    if (env.JWT_ACCESS_SECRET === env.JWT_REFRESH_SECRET) {
      ctx.addIssue({ code: 'custom', path: ['JWT_REFRESH_SECRET'], message: 'must differ from JWT_ACCESS_SECRET' });
    }

    if (env.COOKIE_SAME_SITE === 'none' && env.NODE_ENV !== 'production') {
      ctx.addIssue({
        code: 'custom',
        path: ['COOKIE_SAME_SITE'],
        message: '"none" requires secure cookies (NODE_ENV=production)',
      });
    }
  });

export type Env = z.infer<typeof envSchema>;
