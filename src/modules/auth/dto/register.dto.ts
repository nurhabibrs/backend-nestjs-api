/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  name!: string;

  @ValidateIf(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (obj) => obj.email !== undefined && obj.email !== null && obj.email !== '',
  )
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsString()
  phone_number?: string;
}
