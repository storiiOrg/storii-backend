import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreationUser } from './user.helpers';
import { generateSalt, encodeHash } from '../auth/auth.utilities';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(query: { id?: number; email?: string }): Promise<User> {
    if (query.id != null) {
      return this.usersRepository.findOneBy({ id: query.id });
    } else if (query.email != null) {
      return this.usersRepository.findOneBy({ email: query.email });
    }
  }

  async createOne(user: CreationUser): Promise<boolean> {
    const existingUser = await this.findOne({
      email: user.email,
    });

    // Precautionary checks
    if (
      existingUser ||
      !user.email ||
      !user.firstName ||
      !user.lastName ||
      !user.password
    )
      return false;

    const newUser = new User(user);

    const salt = await generateSalt();
    const hashed = await encodeHash(user.password, salt);
    newUser.hash = hashed;
    newUser.salt = salt;

    const response = await this.usersRepository.save(newUser);
    return response.id != null;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
