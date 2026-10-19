import { z } from 'zod';
import { UserSchema } from '../../../../domain/entities/user.entity';

export const CreateUserRequestDtoSchema = z
  .object({
    email: UserSchema.shape.email,
    name: UserSchema.shape.name,
    password: z.string().min(8, { error: 'Password must be at least 8 characters long' }).max(255),
  })
  .meta({ id: 'CreateUserRequestDto', description: 'Create user request' });

export type CreateUserRequestDto = z.infer<typeof CreateUserRequestDtoSchema>;