export abstract class JwtTokenPayloadResponse {
  sub: string;
  email: string;
  jti: string;
  exp: number;
}