import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  JoinTable,
  ManyToMany,
  OneToMany,
  BeforeUpdate
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('admin')
export class AdminEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;


  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }


}
