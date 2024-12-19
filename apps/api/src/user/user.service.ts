import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { convertStringToObjectId } from '../shared/entityUtils';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(uid: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id: convertStringToObjectId(uid),
    });

    if (!user) {
      throw new NotFoundException(`User with ID "${uid}" was not found`);
    }

    return user;
  }

  async update(id: string, updateData: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async delete(uid: string): Promise<void> {
    const id = convertStringToObjectId(uid);
    const result = await this.userRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`No user with ID "${uid}" was found`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return (
      (await this.userRepository.findOneBy({
        email,
      })) || null
    );
  }
}
