import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { JWTGuard } from '../auth/guards';
import { GetUser } from '../auth/decorator';

@Controller('users')
@UseGuards(JWTGuard)
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('edit-me')
  editUsere() {
    return '';
  }
}
