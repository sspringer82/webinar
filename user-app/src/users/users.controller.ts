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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './createuser.dto';
import { NumberParameter } from './number-parameter';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'all the users',
    type: User,
    isArray: true,
  })
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'a single user',
    type: User,
    isArray: false,
  })
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
