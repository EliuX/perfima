import { Column, Entity } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BaseEntity } from '../../shared/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @ApiProperty({
    description: 'User"s name',
    minLength: 3,
    maxLength: 50,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'User"s email address (must be unique)',
    format: 'email',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ nullable: false })
  @ApiProperty({
    description: 'User"s password (minimum 8 characters)',
    minLength: 8,
    writeOnly: true,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: 'User"s phone number (optional)',
    example: '+15551234567',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false, default: true })
  isEnabled?: boolean = true;
}
