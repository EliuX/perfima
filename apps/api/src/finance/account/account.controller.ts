import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
// import { JwtAuthGuard } from '../../auth/auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('users/:userId/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    return this.accountService.create(userId, createAccountDto);
  }

  @Get()
  findAll(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.accountService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('id') uid: string,
  ) {
    return this.accountService.findOne(userId, uid);
  }

  @Patch(':id')
  update(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('id') uid: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ) {
    return this.accountService.update(userId, uid, updateAccountDto);
  }

  @Delete(':id')
  remove(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('id') uid: string,
  ) {
    return this.accountService.remove(userId, uid);
  }
}
