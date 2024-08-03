import {
  IsEmail,
  IsStrongPassword
} from 'class-validator';

export class SignInData {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
