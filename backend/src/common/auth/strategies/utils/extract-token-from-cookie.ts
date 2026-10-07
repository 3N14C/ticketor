import type { Request } from 'express';
import { TokenName } from '@infrastructure/cookie/types/token-name.type';

export const extractTokenFromCookie =
  (tokenName: TokenName) =>
  (req: Request): string | null =>
    (req.cookies?.[tokenName] as string) ?? null;
