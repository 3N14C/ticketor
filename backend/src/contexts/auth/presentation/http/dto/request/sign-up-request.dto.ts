import { z } from 'zod';
import { UserSchema } from '@contexts/users/domain/entities/user.entity';

export const SignUpRequestSchema = z
  .object({
    name: UserSchema.shape.name,
    email: UserSchema.shape.email,
    password: z.string().min(8, { error: 'Password must be at least 8 characters long' }).max(255),
  })
  .meta({
    id: 'SignUpRequest',
    description: 'Sign up request',
  });

export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;