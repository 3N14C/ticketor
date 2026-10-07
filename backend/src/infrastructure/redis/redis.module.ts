import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { TokenDenylistService } from './token-denylist.service';

@Module({
  providers: [RedisService, TokenDenylistService],
  exports: [RedisService, TokenDenylistService],
})
export class RedisModule {}
