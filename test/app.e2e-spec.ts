import * as pactum from 'pactum';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { describe } from 'node:test';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarDto, EditBookmarDto } from 'src/bookmark/dto';

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
    describe('Get empty Bookmarks', () => {
      it('Should fetch empty list', () => {
        return pactum
          .spec()
          .get('/bookmarks/all')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create bookmark', () => {
      it('Create bookmark', () => {
        const dto: CreateBookmarDto = {
          title: 'First Bookmark',
          link: 'http://localhost:3000/',
        };
        return pactum
          .spec()
          .post('/bookmarks/create')
          .withBearerToken('$S{accessToken}')
          .withBody(dto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get bookmarks', () => {
      it('Should fetch empty list', () => {
        return pactum
          .spec()
          .get('/bookmarks/all')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    describe('Get bookmarks by ID', () => {
      it('Should get bookmark by ID', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit bookmark', () => {
      it('Should edit the bookmark', () => {
        const dto: EditBookmarDto = {
          description: 'New description',
        };
        return pactum
          .spec()
          .patch('/bookmarks/edit/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{accessToken}')
          .withBody(dto)
          .inspect();
      });
    });
    describe('Delete bookmark', () => {
      it('Should delete', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', '$S{bookmarkId}')
          .withBearerToken('$S{accessToken}')
          .expectStatus(200);
      });
    });
  });
});
