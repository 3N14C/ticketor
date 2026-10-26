export interface TokenPayload {
  sub: string;
  email: string;
}

export interface VerifiedTokenPayload extends TokenPayload {
  jti: string;
  exp: number;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export abstract class TokensServicePort {
  abstract issuePair(payload: TokenPayload): Promise<TokenPair>;
  abstract verifyAccess(token: string): Promise<VerifiedTokenPayload>;
  abstract verifyRefresh(token: string): Promise<VerifiedTokenPayload>;
}