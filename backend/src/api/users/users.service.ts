import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: UserCreateDto) {
    const hashedPassword = await argon2.hash(dto.password);

    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
  }

  async getAll() {
    const users = await this.prisma.user.findMany();

    if (!users.length) throw new NotFoundException('Users not found');

    return users;
  }
}