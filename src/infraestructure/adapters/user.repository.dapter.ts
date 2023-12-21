import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/User.entity';
import { User } from '../../core/auth/domain/entities/User';
import { UserRepository } from '../../core/auth/domain/ports/outbound/User.repository';

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async findUser(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }
  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async deleteUser(userName: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: userName,
      },
    });
    return this.userRepository.remove(user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
