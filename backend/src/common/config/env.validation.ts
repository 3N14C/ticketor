import { z } from 'zod';

const positiveInt = z.coerce.number().int().positive();
const secret = z.string().min(32, 'must be at least 32 characters');
const path = z.string().startsWith('/', 'must start with "/"');
const notEmpty = z.string().min(1, 'must not be empty');

const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
    PORT: z.coerce.number().int().min(1).max(65535),
    // Количество доверенных прокси перед приложением (0 — не доверять X-Forwarded-For)
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
    // Refresh-токен нужен только эндпоинтам auth, поэтому отдельный (более узкий) path
    COOKIE_REFRESH_PATH: path,
    COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']),

    THROTTLE_TTL: positiveInt,
    THROTTLE_LIMIT: positiveInt,

    OBSERVE_APP_KEY: notEmpty,
    OBSERVE_APP_SECRET: notEmpty,
    OBSERVE_SERVICE_ID: notEmpty,
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

export const validateEnv = (config: Record<string, unknown>): Env => {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    const messages = result.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);

    throw new Error(`Invalid environment variables:\n - ${messages.join('\n - ')}`);
  }

  return result.data;
};
