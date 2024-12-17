import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { convertStringToObjectId } from '../shared/entityUtils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ name, email, password });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(uid: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ _id: convertStringToObjectId(uid) });

    if (!user) {
      throw new NotFoundException(`User with ID ${uid} not found`);
    }

    return user;
  }

  async updateUser(
    id: string,
    updateData: Partial<User>,
  ): Promise<User> {
    const user = await this.findOne(id); // Ensure the user exists
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async deleteUser(uid: string): Promise<void> {
    const result = await this.userRepository.delete({ _id: convertStringToObjectId(uid) });
    if (!result.affected) {
      throw new NotFoundException(`User with ID ${uid} not found`);
    }
  }
}
