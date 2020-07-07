import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({default: ''})
  email: string;

  @Column()
  mobile: string;

  @Column()
  password: string;


  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  update_time: Date;

  @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
  create_time: Date;

  @Column({default: ''})
  remark: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

}
