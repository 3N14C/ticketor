import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class TokenDenylistService {
  private readonly logger = new Logger(TokenDenylistService.name);

  constructor(private readonly redisService: RedisService) {}

  async revoke(jti: string, ttlSeconds: number): Promise<void> {
    await this.execute(() => this.redisService.set(this.key(jti), jti, 'EX', Math.max(ttlSeconds, 1)));
  }

  async revokeOnce(jti: string, ttlSeconds: number): Promise<boolean> {
    const result = await this.execute(() =>
      this.redisService.set(this.key(jti), jti, 'EX', Math.max(ttlSeconds, 1), 'NX'),
    );

    return result === 'OK';
  }

  async isRevoked(jti: string): Promise<boolean> {
    return (await this.execute(() => this.redisService.exists(this.key(jti)))) > 0;
  }

  private key(jti: string): string {
    return `denylist:${jti}`;
  }

  // Redis отвергает EX <= 0, а токен на границе exp ещё может прийти валидным
  private ttlSeconds(exp: number): number {
    return Math.max(exp - Math.floor(Date.now() / 1000), 1);
  }

  private async execute<T>(command: () => Promise<T>): Promise<T> {
    try {
      return await command();
    } catch (error) {
      this.logger.error(`Token denylist is unavailable: ${(error as Error).message}`);
      throw new ServiceUnavailableException('Authentication is temporarily unavailable');
    }
  }
}
