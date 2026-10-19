import { UserRepositoryPort } from '../../../application/ports/user-repository.port';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { NewUser, User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@generated/prisma/client';
import { UserAlreadyExistsError } from '../../../domain/errors/user.error';

@Injectable()
export class PrismaUserRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(user: NewUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          passwordHash: user.passwordHash,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new UserAlreadyExistsError();
      }
      throw e;
    }
  }
}