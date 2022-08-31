import { Controller, Get } from '@nestjs/common';
import { User } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
