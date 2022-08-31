import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  getOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async getByCredentials(username: string, password: string): Promise<User> {
    return this.usersRepository.findOneBy({ username, password });
  }

  save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.getOne(id);
    await this.usersRepository.remove(user);
  }
}
