import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInData } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(data: SignInData) {
    const hash = await argon.hash(data.password);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        hash,
      },
    });

    return user;
  }

  signin() {
    return { msg: 'I am signed in' };
  }
}
