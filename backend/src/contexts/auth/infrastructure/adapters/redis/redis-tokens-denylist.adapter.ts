import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { TokensDenylistPort } from '../../../application/ports/tokens-denylist.port';
import { RedisService } from '@shared/infrastructure/redis/redis.service';

@Injectable()
export class RedisTokensDenylistAdapter implements TokensDenylistPort {
  private readonly logger = new Logger(RedisTokensDenylistAdapter.name);

  constructor(private readonly redis: RedisService) {}

  async revoke(jti: string, exp: number): Promise<void> {
    await this.execute(() => this.redis.set(this.key(jti), jti, 'EX', this.ttl(exp)));
  }

  async revokeOnce(jti: string, exp: number): Promise<boolean> {
    const result = await this.execute(() => this.redis.set(this.key(jti), jti, 'EX', this.ttl(exp), 'NX'));

    return result === 'OK';
  }

  async isRevoked(jti: string): Promise<boolean> {
    return (await this.execute(() => this.redis.exists(this.key(jti)))) > 0;
  }

  private key(jti: string): string {
    return `denylist:${jti}`;
  }

  private ttl(exp: number): number {
    return Math.max(exp - Math.floor(Date.now() / 1000), 1);
  }

  private async execute<T>(command: () => Promise<T>): Promise<T> {
    try {
      return await command();
    } catch (error) {
      this.logger.error(`Token denylist is unavailable ${(error as Error).message}`);
      throw new ServiceUnavailableException('Authentication is temporarily unavailable');
    }
  }
}