import { Injectable } from '@nestjs/common';
import { UsersQueriesPort } from '../../../application/ports/users-queries.port';
import { PrismaService } from '@shared/infrastructure/prisma/prisma.service';
import { User } from '../../../domain/entities/user.entity';

@Injectable()
export class PrismaUserQueriesAdapter implements UsersQueriesPort {
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
}