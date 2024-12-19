import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Account } from './entities/account.entity';
import { convertStringToObjectId } from '../../shared/entityUtils';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: MongoRepository<Account>,
  ) {}

  create(userId: string, createAccountDto: CreateAccountDto) {
    const newAccount = this.accountRepository.create(createAccountDto);

    return this.accountRepository.save(newAccount);
  }

  findAll(userId: string) {
    return this.accountRepository.find({
      user: convertStringToObjectId(userId),
    });
  }

  findOne(userId: string, uid: string) {
    return this.accountRepository.findBy({
      id: convertStringToObjectId(uid),
      user: convertStringToObjectId(userId),
    });
  }

  async update(
    userId: string,
    uid: string,
    updateAccountDto: UpdateAccountDto,
  ) {
    const account = await this.findOne(userId, uid);
    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async remove(userId: string, uid: string) {
    const account = this.findOne(userId, uid);

    return await this.accountRepository.deleteOne(account);
  }
}
