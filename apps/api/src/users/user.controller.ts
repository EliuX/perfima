import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<User> {
    return this.userService.createUser(body.name, body.email, body.password);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') uid: string): Promise<User> {
    return this.userService.findOne(uid);
  }

  @Put(':id')
  async updateUser(
    @Param('id') uid: string,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.userService.updateUser(uid, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') uid: string): Promise<void> {
    return this.userService.deleteUser(uid);
  }
}
