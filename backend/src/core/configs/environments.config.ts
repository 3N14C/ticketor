export const ENVIRONMENTS = {
  cors: {
    origin: 'CORS_ORIGIN',
    credentials: 'CORS_CREDENTIALS',
  },
  port: 'PORT',
  db: {
    url: 'DATABASE_URL',
  },
  jwt: {
    access: {
      secret: 'JWT_ACCESS_SECRET',
      expiresIn: 'JWT_ACCESS_EXPIRES_IN',
    },
    refresh: {
      secret: 'JWT_REFRESH_SECRET',
      expiresIn: 'JWT_REFRESH_EXPIRES_IN',
    },
  },
  cookie: {
    path: 'COOKIE_PATH',
    httpOnly: 'COOKIE_HTTP_ONLY',
    sameSite: 'COOKIE_SAME_SITE',
  },
  observe: {
    appKey: 'OBSERVE_APP_KEY',
    appSecret: 'OBSERVE_APP_SECRET',
    serviceId: 'OBSERVE_SERVICE_ID',
  },
  throttle: {
    ttl: 'THROTTLE_TTL',
    limit: 'THROTTLE_LIMIT',
  },
  redis: {
    url: 'REDIS_URL',
  },
} as const;