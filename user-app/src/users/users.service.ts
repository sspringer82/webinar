import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      firstname: 'Basti',
      lastname: 'Springer',
    },
    {
      id: 2,
      firstname: 'Claudia',
      lastname: 'Müller',
    },
    {
      id: 3,
      firstname: 'Brigitte',
      lastname: 'Meier',
    },
    {
      id: 4,
      firstname: 'Benno',
      lastname: 'Schmitt',
    },
  ];

  async getAll(): Promise<User[]> {
    return this.users;
  }
}
