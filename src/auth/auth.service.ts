import { Dependencies, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PublicUser, User } from 'src/users/user.entity';
import { CreationUser, LoginUser } from 'src/users/user.helpers';
import { encodeHash } from './auth.utilities';

@Dependencies(UsersService, JwtService)
@Injectable()
export class AuthService {
  usersService: UsersService;
  jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validateUser(user: LoginUser): Promise<any> {
    // const existingUser = await this.usersService.findOne({ email: user.email });
    // if (!existingUser) {
    //   return null;
    // }
    // const hashed = await encodeHash(user.password, existingUser.salt);
    // if (hashed === existingUser.hash) {
    //   //TODO:salt and encrypt passwords
    //   return new PublicUser(existingUser);
    // }
    // return null;
  }

  async login(payload: { email: string; pass: string }) {
    // check if user is logged in
    const existingUser = await this.usersService.findOne({
      email: payload.email,
    });

    if (!existingUser) return null;

    const hashed = await encodeHash(payload.pass, existingUser.salt);

    if (hashed === existingUser.hash) {
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    return null;
  }

  async register(user: CreationUser) {
    try {
      await this.usersService.createOne(user);

      // Also send an email to the new user
      return true;
    } catch (error) {
      return false;
    }
  }
}
