import { Module } from '@nestjs/common';
import { FindUsersUseCase } from './application/use-cases/find-users.use-case';
import { UserRepositoryPort } from './application/ports/user-repository.port';
import { PrismaUserRepositoryAdapter } from './infrastructure/adapters/prisma/prisma-user-repository.adapter';
import { UsersController } from './presentation/http/controllers/users.controller';
import { PasswordHasherPort } from './application/ports/password-hasher.port';
import { Argon2HasherAdapter } from './infrastructure/adapters/argon2/argon2-hasher.adapter';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case';

@Module({
  providers: [
    FindUsersUseCase,
    CreateUserUseCase,
    FindUserByEmailUseCase,
    {
      provide: UserRepositoryPort,
      useClass: PrismaUserRepositoryAdapter,
    },
    {
      provide: PasswordHasherPort,
      useClass: Argon2HasherAdapter,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}