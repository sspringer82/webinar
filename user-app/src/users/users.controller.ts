import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne(parseInt(id, 10));
  }

  // Create
  @Post('/')
  create(@Body() newUser: User): Promise<User> {
    return this.usersService.save(newUser);
  }

  // Update
  @Put('/:id')
  update(@Body() updatedUser: User): Promise<User> {
    return this.usersService.save(updatedUser);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(parseInt(id, 10));
  }
}
