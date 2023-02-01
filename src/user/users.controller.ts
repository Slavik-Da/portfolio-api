import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { type User } from './entities/users.entity';
import { type DeleteResult } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() newUser: CreateUserDto): Promise<User | null> {
    return await this.usersService.register(newUser);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get(':userId')
  async getById(@Param('userId') userId: string): Promise<User | null> {
    return await this.usersService.getUserById(userId);
  }

  @Delete(':userId')
  async deleteById(@Param('userId') userId: string): Promise<DeleteResult> {
    return await this.usersService.deleteById(userId);
  }
}
