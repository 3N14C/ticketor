export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface VerifyCredentialsInput {
  email: string;
  password: string;
}

export abstract class UsersGatewayPort {
  abstract signUp(input: SignUpInput): Promise<AuthUser>;
  abstract verifyCredentials(input: VerifyCredentialsInput): Promise<AuthUser | null>;
  abstract findById(id: string): Promise<AuthUser | null>;
}