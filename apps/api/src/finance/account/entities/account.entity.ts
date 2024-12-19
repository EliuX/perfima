import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { User } from '../../../user/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Coin } from './Coin';

@Entity('users')
export class Account extends BaseEntity {
  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: 'Account"s total amount available (Optional)',
    example: '99.99',
    default: 0,
  })
  amount: number;

  @ApiPropertyOptional({
    default: Coin.CAD,
    description: 'Account"s coin used (Optional)',
    enum: Coin,
    example: 'USD',
  })
  @ApiProperty({ required: false, default: false })
  disabled?: boolean;
}
