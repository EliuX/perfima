import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'There was an error in the request.' })
  async createUser(@Body() dto: User): Promise<User> {
    return this.userService.create(dto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The list of users has been successfully retrieved.',
  })
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The corresponding user has been successfully retrieved.',
  })
  @ApiNotFoundResponse({
    description: 'There is no user with the specified ID.',
  })
  async getUserById(@Param('id') uid: string): Promise<User> {
    return this.userService.findOne(uid);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ description: 'The user has been successfully updated.' })
  @ApiNotFoundResponse({
    description: 'There is no user with the specified ID.',
  })
  async updateUser(
    @Param('id') uid: string,
    @Body() updateData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(uid, updateData);
  }

  @Delete(':id')
  @ApiNoContentResponse({
    description: 'The user has been successfully deleted.',
  })
  @ApiNotFoundResponse({
    description: 'There is no user with the specified ID.',
  })
  async deleteUser(@Param('id') uid: string): Promise<void> {
    return this.userService.delete(uid);
  }
}
