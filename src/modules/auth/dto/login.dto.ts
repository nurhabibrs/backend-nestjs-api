import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'john@mail.co.id',
    description: 'Email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password account',
  })
  @IsString()
  password!: string;
}
