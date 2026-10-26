import { z } from 'zod';
import { UserSchema } from '@contexts/users/domain/entities/user.entity';

export const SignInRequestSchema = z
  .object({
    email: UserSchema.shape.email,
    password: z.string().min(8, { error: 'Password must be at least 8 characters long' }).max(255),
  })
  .meta({
    id: 'SignInRequest',
    description: 'Sign in request',
  });

export type SignInRequest = z.infer<typeof SignInRequestSchema>;