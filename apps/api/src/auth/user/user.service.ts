import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './model/user.entity';
import { convertStringToObjectId } from '../../shared/entityUtils';
import { CreateUserDto } from './model/create-user.dto';
import { UpdateUserDto } from './model/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(uid: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ _id: convertStringToObjectId(uid) });

    if (!user) {
      throw new NotFoundException(`User with ID "${uid}" was not found`);
    }

    return user;
  }

  async updateUser(
    id: string,
    updateData: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(id); // Ensure the user exists
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async deleteUser(uid: string): Promise<void> {
    const id = convertStringToObjectId(uid);
    const result = await this.userRepository.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`User with ID "${uid}" was not found`);
    }
  }
}
