import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('signin')
  signup() {
    return this.authSerivce.signup();
  }

  @Post('signup')
  signin() {
    return this.authSerivce.signin();
  }
}
