import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { type SaveUserDto } from '../dto/save-user.dto';
import { User } from '../entities/users.entity';

@Injectable()
export class UsersDAO {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async getUserByEmail(userEmail: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email: userEmail });
  }

  async saveUser(user: SaveUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findUserById(userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
