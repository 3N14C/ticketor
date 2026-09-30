export abstract class JwtTokenPayloadResponseDto {
  sub: string;
  email: string;
  jti: string;
  exp: number;
}