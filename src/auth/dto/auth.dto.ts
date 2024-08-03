import { IsEmail, IsStrongPassword } from 'class-validator';

export class AuthDTO {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

export interface ResponseDTO {
  access_token: string;
}
