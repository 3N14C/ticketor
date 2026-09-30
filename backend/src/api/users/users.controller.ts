import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessToken } from '../auth/decorators/access-token.decorator';
import { UserResponseDto } from './dto/res/user-response.dto';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  @AccessToken()
  async getByEmail(@Param('email') email: string): Promise<UserResponseDto> {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    return new UserResponseDto(user);
  }
}