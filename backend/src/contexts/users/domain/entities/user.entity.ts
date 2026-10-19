import { z } from 'zod';

export const UserSchema = z.object({
  id: z.cuid2().describe('CUID of user'),
  email: z.email({ error: 'Email is invalid' }).toLowerCase().describe('Email of user'),
  name: z.string({ error: 'Name is invalid' }).min(3).max(50).describe('Name of user'),
  passwordHash: z.string({ error: 'Password hash is invalid' }).describe('Password hash'),
  createdAt: z.date({ error: 'Created at is invalid' }).describe('Created at'),
  updatedAt: z.date({ error: 'Updated at is invalid' }).describe('Updated at'),
});

export type User = z.infer<typeof UserSchema>;

export const NewUserSchema = UserSchema.pick({ email: true, name: true, passwordHash: true });
export type NewUser = z.infer<typeof NewUserSchema>;