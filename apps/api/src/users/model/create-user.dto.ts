import { User } from './user.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateUserDto extends OmitType(User, ['_id', 'createdAt', 'updatedAt', 'isEnabled']) {}
