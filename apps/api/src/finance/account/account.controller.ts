import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { Account } from './entities/account.entity';
import { ApiBody } from '@nestjs/swagger';
import { UpdateUserDto } from '../../user/dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Req() req, @Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto, req.user.sub);
  }

  @Get()
  findAll(@Req() req) {
    return this.accountService.findAll(req.user.sub);
  }

  @Get(':id')
  async findOne(@Req() req, @Param('id') uid: string) {
    return this.accountService.findOne(uid, req.user.sub);
  }

  @Put(':id')
  @ApiBody({ type: UpdateAccountDto })
  async update(
    @Req() req,
    @Param('id') uid: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return this.accountService.update(uid, updateAccountDto, req.user.sub);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') uid: string): Promise<void> {
    return this.accountService.remove(uid, req.user.sub);
  }
}
