import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('signup')
  signup(@Body() data: AuthDTO) {
    return this.authSerivce.signup(data);
  }

  @Post('signin')
  signin(@Body() data: AuthDTO) {
    return this.authSerivce.signin(data);
  }
}
