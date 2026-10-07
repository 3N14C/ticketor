// Данные, которые кладутся в токен при выдаче
export interface JwtPayload {
  sub: string;
  email: string;
}

// То, что приходит из проверенного токена: к JwtPayload добавляются jti и exp
export interface VerifiedJwtPayload extends JwtPayload {
  jti: string;
  exp: number;
}
