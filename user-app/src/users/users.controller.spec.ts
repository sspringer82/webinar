import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all users', async () => {
    const result = controller.getAll();
    expect(await result).toEqual([
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
