import {IsNotEmpty} from 'class-validator';

export class UserPassDto {

  @IsNotEmpty()
  readonly username: string;


  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly newpassword: string;
}