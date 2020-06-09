import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  readonly mobile: string;

  @IsNotEmpty()
  readonly password: string;
}