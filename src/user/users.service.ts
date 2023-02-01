import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { type DeleteResult, Repository } from 'typeorm';
import { type CreateUserDto } from './dto/create-user.dto';
import { UsersDAO } from './dao/usersDAO';
import { hashData } from '../common/libs/hashData';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
    public usersDAO: UsersDAO
  ) {}

  async register(newUser: CreateUserDto): Promise<User | null> {
    const user: User | null = await this.usersDAO.getUserByEmail(newUser.email);
    if (user != null) {
      throw new HttpException('User exists', HttpStatus.CONFLICT);
    }
    const hashedPass = await hashData(newUser.password);

    await this.usersDAO.saveUser({
      email: newUser.email,
      hashedPassword: hashedPass,
    });

    return await this.usersDAO.getUserByEmail(newUser.email);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
