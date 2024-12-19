import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { Account } from './entities/account.entity';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAccountDto } from './dto/create-account.dto';

@UseGuards(JwtGuard)
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiBody({ type: CreateAccountDto })
  @ApiCreatedResponse({
    description: 'The account has been successfully created.',
  })
  create(@Req() req, @Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto, req.user.sub);
  }

  @Get()
  @ApiOkResponse({
    description: 'The accounts has been successfully retrieved.',
  })
  findAll(@Req() req) {
    return this.accountService.findAll(req.user.sub);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The account has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    description: 'There is no account for the user with the specified ID',
  })
  async findOne(@Req() req, @Param('id') uid: string): Promise<Account> {
    return this.accountService.findOne(uid, req.user.sub);
  }

  @Put(':id')
  @ApiBody({ type: UpdateAccountDto })
  @ApiOkResponse({ description: 'The account has been successfully updated.' })
  @ApiNotFoundResponse({
    description: 'There is no account for the user with the specified ID.',
  })
  async update(
    @Req() req,
    @Param('id') uid: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    return await this.accountService.update(
      uid,
      updateAccountDto,
      req.user.sub,
    );
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') uid: string): Promise<void> {
    return this.accountService.remove(uid, req.user.sub);
  }
}
