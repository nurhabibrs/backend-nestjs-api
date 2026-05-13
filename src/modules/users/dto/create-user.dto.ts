/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @MinLength(8)
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;
}
