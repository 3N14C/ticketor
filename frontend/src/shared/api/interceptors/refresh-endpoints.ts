const AUTH_PATH = "/api/v1/auth";

export const REFRESH_ENDPOINT = `${AUTH_PATH}/refresh-tokens`;

export const CREDENTIALS_ENDPOINTS: readonly string[] = [`${AUTH_PATH}/sign-in`, `${AUTH_PATH}/sign-up`];