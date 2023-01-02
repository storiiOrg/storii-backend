import { Dependencies, Injectable } from '@nestjs/common';
import { User, UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  usersService: UsersService;
  jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      //TODO:salt and encrypt passwords
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User) {
    // TODO: Check if email already registered
    const salt = await bcrypt.genSalt();
    const password = user.password;
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
