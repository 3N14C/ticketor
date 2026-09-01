import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(dto: SignUpDto) {
    const { confirmPassword, ...rest } = dto;

    if (dto.password !== confirmPassword)
      throw new BadRequestException('Passwords do not match');

    const existUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (existUser) throw new BadRequestException('User already exists');

    return this.usersService.create(rest);
  }
}