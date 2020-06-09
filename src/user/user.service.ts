import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import {CreateUserDto, LoginAdminUserDto, LoginUserDto, UpdateUserDto} from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../config';
import {UserData, UserRO} from './user.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import {MsgModule} from "../msg/msg.module";
import {MsgService} from "../msg/msg.service";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly MSG: MsgService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne({mobile, password}: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({mobile});
    if (!user) {
      return null;
    }

    if (await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async create(dto: CreateUserDto): Promise<UserData> {

    // check uniqueness of username/email
    const {username, mobile, password} = dto;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.mobile = :mobile', { mobile })

    const user = await qb.getOne();

    if (user) {
      const errors = {username: 'Username and email must be unique.'};
      this.MSG.fail('Input data validation failed',400)
      // throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);

    }

    // create new user
    let newUser = new UserEntity();
    newUser.username = username;
    newUser.mobile = mobile;
    newUser.password = password;

    const savedUser = await this.userRepository.save(newUser);
    return this.buildUserRO(savedUser);

  }

  async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
    let toUpdate = await this.userRepository.findOne(id);
    delete toUpdate.password;

    let updated = Object.assign(toUpdate, dto);
    return await this.userRepository.save(updated);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ email: email});
  }

  async findById(id: number): Promise<UserData>{
    const user = await this.userRepository.findOne(id);

    if (!user) {
      const errors = {User: ' not found'};
      throw new HttpException({errors}, 401);
    }

    return this.buildUserRO(user);
  }


  async findByUserAndPass(userp:LoginAdminUserDto){
    let user = await this.userRepository.findOne(userp)
    this.isUser(user)
    return user
  }
  public generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  };
 private isUser(user:any){
   if (!user) {
     const errors = {User: ' not found'};
     throw new HttpException({errors}, 401);
   }
 }
  private buildUserRO(user: UserEntity) {
    const userRO = {
      id: user.id,
      username: user.username,
      mobile: user.mobile,
      token: this.generateJWT(user)
    };

    return userRO;
  }
}
