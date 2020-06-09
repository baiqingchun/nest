import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { AdminEntity } from './admin.entity';
import {UserDto} from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../config';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import {MsgService} from "../msg/msg.service";


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly userRepository: Repository<AdminEntity>,
    private readonly MSG: MsgService
  ) {}

  async findAll(): Promise<AdminEntity[]> {
    return await this.userRepository.find();
  }

  async findOne({username, password}: UserDto): Promise<AdminEntity> {
    const user = await this.userRepository.findOne({username});
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async create(dto: UserDto) {

    // check uniqueness of username/email
    const {username,  password} = dto;
    const qb = await getRepository(AdminEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })

    const user = await qb.getOne();

    if (user) {
      this.MSG.fail('Username must be unique',400)
    }

    // create new user
    let newUser = new AdminEntity();
    newUser.username = username;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = {username: 'Userinput is not valid.'};
      this.MSG.fail('Input data validation failed',HttpStatus.BAD_REQUEST)

    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }

  }





  async findById(id: number){
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildUserRO(user);
  }

  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };
 private isUser(user:any){
   if (!user) {
     const errors = {User: ' not found'};
     throw new HttpException({errors}, 401);
   }
 }
  private buildUserRO(user: AdminEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      token: this.generateJWT(user)
    };

    return userRO;
  }
}
