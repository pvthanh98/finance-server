import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  code: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}