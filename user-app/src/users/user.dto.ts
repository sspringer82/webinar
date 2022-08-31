import { IsPositive } from 'class-validator';
import { CreateUserDto } from './createuser.dto';

export class UserDto extends CreateUserDto {
  @IsPositive()
  id: number;
}
