import { OmitType } from '@nestjs/swagger';
import { Account } from '../entities/account.entity';
import { CommonReadOnlyAttributes } from '../../../shared/entityUtils';

export class CreateAccountDto extends OmitType(Account, [
  ...CommonReadOnlyAttributes,
  'userId',
  'disabled',
]) {}
