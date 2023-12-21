import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_APPLICATION } from '../../../core/core.module';
import { UserApplication } from '../../../core/auth/application/UserApplication';
import { User } from '../../../core/auth/domain/entities/User';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_APPLICATION)
    private userApplication: UserApplication,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    console.log('validateUser', username, password);
    const user = await this.userApplication.findUser(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
