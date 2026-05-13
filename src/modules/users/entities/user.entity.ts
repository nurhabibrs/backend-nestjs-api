import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: 'nama pengguna' })
  name!: string;

  @Column({ unique: true, comment: 'alamat email' })
  email!: string;

  @Column({ select: false, comment: 'kata sandi' })
  password!: string;

  @Column({ nullable: true, comment: 'nomor telepon' })
  phone_number?: string;

  @Column({
    type: 'text',
    enum: UserRole,
    default: UserRole.USER,
    comment: 'role pengguna',
  })
  role!: UserRole;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updated_at!: Date;
}
