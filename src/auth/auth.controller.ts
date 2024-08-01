import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInData } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('signup')
  signup(@Body() data: SignInData) {
    console.log(data.email, data.password)
    return this.authSerivce.signup();
  }

  @Post('signin')
  signin() {
    return this.authSerivce.signin();
  }
}
