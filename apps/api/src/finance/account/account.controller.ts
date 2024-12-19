import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { JwtGuard } from '../../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  create(@Req() req, @Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(req.user.sub, createAccountDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.accountService.findAll(req.user.sub);
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
