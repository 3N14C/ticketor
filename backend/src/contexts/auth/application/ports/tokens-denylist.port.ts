export abstract class TokensDenylistPort {
  abstract revoke(jti: string, exp: number): Promise<void>;
  abstract revokeOnce(jti: string, exp: number): Promise<boolean>;
  abstract isRevoked(jti: string): Promise<boolean>;
}