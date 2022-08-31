import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

const repositoryMockFactory: () => Repository<User> = jest.fn(
  () =>
    ({
      find: jest.fn(() => [
        {
          id: 1,
          fistname: 'Claudia',
          lastname: 'Müller',
          username: 'cmueller',
          password: 'geheim',
        },
      ]),
    } as any as Repository<User>),
);

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', async () => {
    const data = await service.getAll();
    expect(data).toHaveLength(1);
    expect(data[0]).toEqual({
      id: 1,
      fistname: 'Claudia',
      lastname: 'Müller',
      username: 'cmueller',
      password: 'geheim',
    });
  });
});
