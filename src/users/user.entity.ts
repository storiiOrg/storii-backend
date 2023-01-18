import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreationUser } from './user.helpers';

@Entity()
export class User {
  constructor(newUser?: CreationUser) {
    this.emailVerified = false;
    this.isActive = false;

    if (!newUser) return;

    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.email = newUser.email;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  emailVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  profileImageId: string;

  @Column()
  salt: string;

  @Column()
  hash: string;
}

export class PublicUser {
  constructor(user?: Partial<User>) {
    if (!user) return;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    // this.profileUrl = user.profileImage.url; //FIXME: Needs to get the url
  }
  firstName: string;
  lastName: string;
  profileUrl: string;
}
