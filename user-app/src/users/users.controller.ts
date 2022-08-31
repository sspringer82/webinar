import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  ImATeapotException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './createuser.dto';
import { NumberParameter } from './number-parameter';
import { UserDto } from './user.dto';
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
  async getOne(@Param() params: NumberParameter): Promise<User> {
    const user = await this.usersService.getOne(parseInt(params.id, 10));
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @Post('/')
  create(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.save(newUser as User);
  }

  @Put('/:id')
  update(@Body() updatedUser: UserDto): Promise<User> {
    return this.usersService.save(updatedUser as User);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param() params: NumberParameter): Promise<void> {
    return this.usersService.remove(parseInt(params.id, 10));
  }
}
