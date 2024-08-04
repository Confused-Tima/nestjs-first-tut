import {
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';
import { AuthDTO, ResponseDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signToken(userId: number, email: string): Promise<ResponseDTO> {
    const payload = {
      id: userId,
      email,
    };
    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('SECRET'),
      }),
    };
  }

  async signup(data: AuthDTO) {
    const hash = await argon.hash(data.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002')
          throw new ForbiddenException('Credentials Taken.');
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  async signin(data: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      const isHashMatch = await argon.verify(user.hash, data.password);
      if (isHashMatch) {
        return this.signToken(user.id, user.email);
      }
      throw new ForbiddenException('Password does not match');
    }
    throw new ForbiddenException('User does not exists');
  }
}
