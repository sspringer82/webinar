import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  ImATeapotException,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './createuser.dto';
import { NumberParameter } from './number-parameter';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

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
    this.logger.log('Hallo Welt');
    this.logger.error('Oh nooo 👻');
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
