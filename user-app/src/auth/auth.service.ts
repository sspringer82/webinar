import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: { username: string; password: string }) {
    const validatedUser = await this.usersService.getByCredentials(
      user.username,
      user.password,
    );

    if (validatedUser) {
      const payload = {
        username: validatedUser.username,
        sub: validatedUser.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
