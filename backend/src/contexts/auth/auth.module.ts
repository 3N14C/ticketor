import { Module } from '@nestjs/common';
import { AuthController } from './presentation/http/controllers/auth.controller';
import { UsersModule } from '@contexts/users/users.module';
import { AuthGuardsModule } from './auth-guards.module';
import { SignUpHandler } from './application/commands/sign-up/sign-up.handler';
import { SignInHandler } from './application/commands/sign-in/sign-in.handler';
import { SignOutHandler } from './application/commands/sign-out/sign-out.handler';
import { RefreshTokensHandler } from './application/commands/refresh-tokens/refresh-tokens.handler';
import { CurrentUserHandler } from './application/queries/current-user/current-user.handler';
import { UsersGatewayPort } from './application/ports/users-gateway.port';
import { UsersGatewayAdapter } from './infrastructure/adapters/users/users-gateway.adapter';

@Module({
  imports: [UsersModule, AuthGuardsModule],
  providers: [
    SignUpHandler,
    SignInHandler,
    SignOutHandler,
    RefreshTokensHandler,
    CurrentUserHandler,
    {
      provide: UsersGatewayPort,
      useClass: UsersGatewayAdapter,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}