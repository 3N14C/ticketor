import { UnauthorizedException } from '@nestjs/common';
import { TokenDenylistService } from '@infrastructure/redis/token-denylist.service';

export const assertTokenNotRevoked = async (tokenDenylistService: TokenDenylistService, jti: string): Promise<void> => {
  const isRevoked = await tokenDenylistService.isRevoked(jti);

  if (isRevoked) throw new UnauthorizedException('Token revoked');
};
