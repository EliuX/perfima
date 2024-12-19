import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from 'src/shared/base.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Coin } from './Coin';
import { ObjectId } from 'mongodb';

@Entity()
@Index('unique_user_account', ['userId', 'id'], { unique: true })
export class Account extends BaseEntity {
  @Column({ nullable: true })
  userId: ObjectId;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: 'Account"s identifier (Optional)',
    example: 'Regular Account',
  })
  name: string;

  @Column()
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
