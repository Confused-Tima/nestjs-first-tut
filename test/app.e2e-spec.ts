import * as pactum from 'pactum';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { describe } from 'node:test';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();
    await app.listen(3000);

    prisma = app.get(PrismaService);

    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3000');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const data = {
      email: 'amit12@gmail.com',
      password: 'aAmit123@--',
    };
    describe('Signup', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: data.password,
          })
          .expectStatus(400);
      });

      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: data.email,
          })
          .expectStatus(400);
      });

      it('Should throw if no body prpvided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });

      it('Should Sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(data)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: data.password,
          })
          .expectStatus(400);
      });

      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: data.email,
          })
          .expectStatus(400);
      });

      it('Should throw if no body prpvided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });

      it('Should Sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(data)
          .expectStatus(200)
          .stores('accessToken', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Get me', () => {
      it('Should get me', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200);
      });
      it('Should edit me', () => {
        const dto: EditUserDto = { lastName: 'Bisht' };
        return pactum
          .spec()
          .patch('/users/edit-me')
          .withBearerToken('$S{accessToken}')
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .expectBodyContains(dto.lastName);
      });
    });
    describe('Edit me', () => {});
  });
  describe('Bookmarks', () => {
    describe('Create bookmark', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmarks by ID', () => {});
    describe('Edit bookmark', () => {});
    describe('Delete bookmark', () => {});
  });
});
