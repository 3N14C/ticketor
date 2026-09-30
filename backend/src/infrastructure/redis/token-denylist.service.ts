import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class TokenDenylistService {
  constructor(private readonly redisService: RedisService) {}

  async revoke(jti: string, ttlSeconds: number): Promise<void> {
    await this.redisService.set(`denylist:<${jti}>`, jti, 'EX', ttlSeconds);
    return;
  }

  async isRevoked(jti: string): Promise<boolean> {
    return (await this.redisService.exists(`denylist:<${jti}>`)) > 0;
  }
}