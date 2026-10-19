import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FindUsersUseCase } from '../../../application/use-cases/find-users.use-case';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { toUserResponse, UserResponse, UserResponseSchema } from '../dto/response/user-response.dto';
import { type CreateUserRequestDto, CreateUserRequestDtoSchema } from '../dto/request/create-user-request.dto';
import { CreateUserUseCase } from '../../../application/use-cases/create-user.use-case';
import { z } from 'zod';
import { FindUserByEmailUseCase } from '../../../application/use-cases/find-user-by-email.use-case';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'User created',
    standardSchema: UserResponseSchema,
  })
  @ApiConflictResponse({
    description: 'User already exists',
  })
  async create(@Body({ schema: CreateUserRequestDtoSchema }) dto: CreateUserRequestDto): Promise<UserResponse> {
    const user = await this.createUserUseCase.execute(dto);
    return toUserResponse(user);
  }

  @Get()
  @ApiOperation({ summary: 'Find all users' })
  @ApiOkResponse({ description: 'List of users', standardSchema: z.array(UserResponseSchema) })
  async findAll(): Promise<UserResponse[]> {
    const users = await this.findUsersUseCase.execute();
    return users.map(toUserResponse);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Find user by email' })
  @ApiOkResponse({ description: 'One user', standardSchema: UserResponseSchema })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findByEmail(@Param('email', { schema: z.email().toLowerCase() }) email: string): Promise<UserResponse> {
    const user = await this.findUserByEmailUseCase.execute(email);
    return toUserResponse(user);
  }
}