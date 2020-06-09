import {IsEmpty, IsMobilePhone, IsNotEmpty} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly mobile: string;

  @IsNotEmpty()
  readonly password: string;
}