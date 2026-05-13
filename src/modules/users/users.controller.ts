import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  Req,
  Query,
} from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtPayload as AuthenticatedUser } from '../../interfaces/jwt.interface';
import { UserRole } from './entities/user.entity';
import { FindAllUserDto } from './dto/find-user.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user (admin only)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden – admin only' })
  create(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
    const currentUser = req.user as AuthenticatedUser;

    if (currentUser.role !== (UserRole.ADMIN as string)) {
      throw new ForbiddenException('Only admins can create users');
    }

    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden – admin only' })
  findAll(@Req() req: Request, @Query() query: FindAllUserDto) {
    const currentUser = req.user as AuthenticatedUser;

    if (currentUser.role !== (UserRole.ADMIN as string)) {
      throw new ForbiddenException('Only admins can show all users');
    }

    return this.usersService.findAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
