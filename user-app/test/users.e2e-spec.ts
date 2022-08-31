import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersService } from './../src/users/users.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue({
        getAll() {
          return Promise.resolve([
            {
              id: 1,
              fistname: 'Claudia',
              lastname: 'Müller',
              username: 'cmueller',
              password: 'geheim',
            },
          ]);
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        {
          id: 1,
          fistname: 'Claudia',
          lastname: 'Müller',
          username: 'cmueller',
          password: 'geheim',
        },
      ]);
  });
});
