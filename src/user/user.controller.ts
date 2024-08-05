import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { JWTGuard } from '../auth/guards';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@Controller('users')
@UseGuards(JWTGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('edit-me')
  editUsere(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
