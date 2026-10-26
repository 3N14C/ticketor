import { Injectable } from '@nestjs/common';
import { UsersCommandsPort } from '../../../application/ports/users-commands.port';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NewUser, User } from '../../../domain/entities/user.entity';
import { Prisma } from '@generated/prisma/client';
import { UserAlreadyExistsError } from '../../../domain/errors/user-already-exists.error';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';

@Injectable()
export class PrismaUserCommandsAdapter implements UsersCommandsPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: NewUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: { email: user.email, name: user.name, passwordHash: user.passwordHash },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') throw new UserAlreadyExistsError();
      throw e;
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') throw new UserNotFoundError();
      throw e;
    }
  }
}