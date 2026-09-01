export const ENVIRONMENTS = {
  cors: {
    origin: 'CORS_ORIGIN',
    credentials: 'CORS_CREDENTIALS',
  },
  port: 'PORT',
  db: {
    url: 'DATABASE_URL',
  },
} as const;