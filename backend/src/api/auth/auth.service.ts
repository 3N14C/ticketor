import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { MessageResponse } from '@core/types/message-response';
import { SignInDto } from './dto/sign-in.dto';
import argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(dto: SignUpDto): Promise<MessageResponse> {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existUser) throw new BadRequestException('User already exists');

    await this.usersService.create(dto);

    return {
      message: 'Authorized successfully',
    };
  }

  async signIn(dto: SignInDto): Promise<MessageResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    const isCorrectPassword = await argon2.verify(user.password, dto.password);

    if (!isCorrectPassword)
      throw new BadRequestException('Invalid credentials');

    return {
      message: 'Authorized successfully',
    };
  }
}