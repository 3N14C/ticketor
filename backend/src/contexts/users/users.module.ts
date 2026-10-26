import { Module } from '@nestjs/common';
import { UsersController } from './presentation/http/controllers/users.controller';
import { PasswordHasherPort } from './application/ports/password-hasher.port';
import { Argon2HasherAdapter } from './infrastructure/adapters/argon2/argon2-hasher.adapter';
import { UsersCommandsPort } from './application/ports/users-commands.port';
import { PrismaUserCommandsAdapter } from './infrastructure/adapters/prisma/prisma-user-commands.adapter';
import { UsersQueriesPort } from './application/ports/users-queries.port';
import { PrismaUserQueriesAdapter } from './infrastructure/adapters/prisma/prisma-user-queries.adapter';
import { FindUsersHandler } from './application/queries/find-users/find-users.handler';
import { FindUserByEmailHandler } from './application/queries/find-user-by-email/find-user-by-email.handler';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { DeleteUserHandler } from './application/commands/delete-user/delete-user.handler';
import { FindUserByIdHandler } from './application/queries/find-user-by-id/find-user-by-id.handler';
import { VerifyCredentialsHandler } from './application/queries/verify-credentials/verify-credentials.handler';

@Module({
  providers: [
    FindUsersHandler,
    FindUserByEmailHandler,
    FindUserByIdHandler,
    VerifyCredentialsHandler,
    CreateUserHandler,
    DeleteUserHandler,
    { provide: UsersCommandsPort, useClass: PrismaUserCommandsAdapter },
    { provide: UsersQueriesPort, useClass: PrismaUserQueriesAdapter },
    { provide: PasswordHasherPort, useClass: Argon2HasherAdapter },
  ],
  controllers: [UsersController],
  exports: [CreateUserHandler, VerifyCredentialsHandler, FindUserByIdHandler],
})
export class UsersModule {}