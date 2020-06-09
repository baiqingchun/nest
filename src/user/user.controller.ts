import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import {UserData, UserRO} from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto,LoginAdminUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import {
  ApiBearerAuth, ApiTags
} from '@nestjs/swagger';
import {MsgService} from "../msg/msg.service";

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {

  constructor(private readonly userService: UserService,
              private readonly MSG:MsgService) {}

  @Put('user')
  async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
    return await this.userService.update(userId, userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('user/register')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }



  @UsePipes(new ValidationPipe())
  @Post('user/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    const _user = await this.userService.findOne(loginUserDto);
    if (!_user) this.MSG.fail('no user');
    const token = await this.userService.generateJWT(_user);
    const {mobile, username} = _user;
    const user = {mobile, token, username};
    return {user}
  }
}
