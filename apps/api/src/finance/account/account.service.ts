import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Account } from './entities/account.entity';
import {
  convertObjectIdToString,
  convertStringToObjectId,
} from '../../shared/entityUtils';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: MongoRepository<Account>,
  ) {}

  create(createAccountDto: CreateAccountDto, userId?: string) {
    const newAccount = this.accountRepository.create({
      ...createAccountDto,
      userId: userId ? convertStringToObjectId(userId) : undefined,
    });

    return this.accountRepository.save(newAccount);
  }

  findAll(userId: string) {
    return this.accountRepository.find({
      userId: convertStringToObjectId(userId),
    });
  }

  async findOne(uid: string, userId?: string): Promise<Account> {
    const foundAccount = await this.accountRepository.findOneBy({
      id: convertStringToObjectId(uid),
      userId: userId ? convertStringToObjectId(userId) : undefined,
    });

    if (!foundAccount) {
      throw new NotFoundException(`There is no account with ID "${uid}"`);
    }

    return foundAccount;
  }

  async update(
    uid: string,
    updateAccountDto: UpdateAccountDto,
    userId?: string,
  ) {
    const account = await this.findOne(uid, userId);
    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async remove(uid: string, userId?: string) {
    const result = await this.accountRepository.delete({
      id: convertStringToObjectId(uid),
      userId: convertStringToObjectId(userId),
    });

    if (!result.affected) {
      throw new NotFoundException(`No account with ID "${uid}" was found`);
    }
  }
}
