import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany, OneToMany} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as argon2 from 'argon2';

@Entity('banner')
export class BannerEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
   path: string;


}
