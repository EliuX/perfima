import { User } from '../entities/user.entity';
import { OmitType } from '@nestjs/swagger';
import { CommonReadOnlyAttributes } from '../../shared/entityUtils';

export class CreateUserDto extends OmitType(User, [
  ...CommonReadOnlyAttributes,
  'isEnabled',
]) {}
