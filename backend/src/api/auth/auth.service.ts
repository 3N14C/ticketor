import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { MessageResponse } from '@core/types/message-response';

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
      message: 'User created successfully',
    };
  }
}