import { IsNotEmpty } from 'class-validator';

export class LoginAdminUserDto {

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}