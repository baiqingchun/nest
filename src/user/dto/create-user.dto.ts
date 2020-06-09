import {IsEmpty, IsNotEmpty} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  readonly username: string;

  readonly email?: string;

  @IsNotEmpty()
  readonly password: string;
}