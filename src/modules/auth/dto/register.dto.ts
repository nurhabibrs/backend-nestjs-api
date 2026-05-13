import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'john@company.co.id',
    description: 'Company email address',
  })
  @ValidateIf(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (obj) => obj.email !== undefined && obj.email !== null && obj.email !== '',
  )
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password (min 8 characters)',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiPropertyOptional({
    example: '+628123456789',
    description: 'Phone number',
  })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.USER,
    description: 'User role',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
