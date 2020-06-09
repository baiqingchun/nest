import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { AdminService } from './admin.service';
import {UserDto, UserPassDto} from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import {
  ApiBearerAuth, ApiTags
} from '@nestjs/swagger';
import {MsgService} from "../msg/msg.service";

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {

  constructor(private readonly userService: AdminService,
              private readonly MSG: MsgService) {}

  @Get('users')
  async getall(){
    return this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Put('users')
  async create(@Body() userData: UserDto) {
    return this.userService.create(userData);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body() loginUserDto: UserDto) {
    console.log(loginUserDto)
    const _user = await this.userService.findOne(loginUserDto);

    if (!_user) this.MSG.fail('no user')

    const token = await this.userService.generateJWT(_user);
    const { username} = _user;
    const user = {token, username};
    return {user}
  }
  @Post('change/pass')
  async changePass(@Body() changePassBody: UserPassDto){
    return this.userService.changePass(changePassBody)
  }
}
