import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { VerifyAccessTokenHandler } from './application/queries/verify-access-token/verify-access-token.handler';
import { AccessTokenGuard } from './presentation/guards/access-token.guard';
import { AuthCookiesService } from './presentation/cookies/auth-cookies.service';
import { TokensServicePort } from './application/ports/tokens-service.port';
import { JwtTokensServiceAdapter } from './infrastructure/adapters/jwt/jwt-tokens-service.adapter';
import { TokensDenylistPort } from './application/ports/tokens-denylist.port';
import { RedisTokensDenylistAdapter } from './infrastructure/adapters/redis/redis-tokens-denylist.adapter';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    VerifyAccessTokenHandler,
    AccessTokenGuard,
    AuthCookiesService,
    {
      provide: TokensServicePort,
      useClass: JwtTokensServiceAdapter,
    },
    {
      provide: TokensDenylistPort,
      useClass: RedisTokensDenylistAdapter,
    },
  ],
  exports: [VerifyAccessTokenHandler, AccessTokenGuard, AuthCookiesService, TokensServicePort, TokensDenylistPort],
})
export class AuthGuardsModule {}