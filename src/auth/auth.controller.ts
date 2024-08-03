import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInData } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('signup')
  signup(@Body() data: SignInData) {
    return this.authSerivce.signup(data);
  }

  @Post('signin')
  signin() {
    return this.authSerivce.signin();
  }
}
