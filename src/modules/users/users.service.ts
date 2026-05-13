import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { FindAllUserDto } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{
    message: string;
    data: Omit<User, 'password'>;
  }> {
    const existing = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    }

    const user = this.usersRepository.create(createUserDto);

    const saved = await this.usersRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = saved;

    return {
      message: 'User created successfully',
      data: result,
    };
  }

  async findAll(query: FindAllUserDto): Promise<{
    message: string;
    data: Omit<User, 'password'>[];
    meta: { total: number; page: number; limit: number; total_pages: number };
  }> {
    const { name, page, limit, order, role } = query;

    const qb = this.usersRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.role',
        'user.phone_number',
        'user.created_at',
      ])
      .orderBy('user.created_at', order === 'desc' ? 'DESC' : 'ASC');

    if (name) {
      qb.andWhere('LOWER(user.name) LIKE LOWER(:name)', { name: `${name}%` });
    }

    if (role) {
      qb.andWhere('user.role = :role', { role });
    }

    const users = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const total = await qb.getCount();

    return {
      message: 'Users retrieved successfully',
      data: users.map((user) => user as Omit<User, 'password'>),
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<{
    message: string;
    data: Omit<User, 'password'>;
  }> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return {
      message: 'User retrieved successfully',
      data: result,
    };
  }
}
