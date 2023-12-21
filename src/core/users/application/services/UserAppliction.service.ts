import { User } from '../../domain/entities/User';
import { UserService } from '../../domain/ports/inbound/UserService';

export class UserApplicationService implements UserService {
  constructor(private repository: UserService) {}
  async findUser(username: string): Promise<User> {
    return this.repository.findUser(username);
  }
  async createUser(user: User): Promise<User> {
    return this.repository.createUser(user);
  }
  async updateUser(user: User): Promise<User> {
    return this.repository.updateUser(user);
  }
  async deleteUser(username: string): Promise<User> {
    return this.repository.deleteUser(username);
  }
  async getUsers(): Promise<User[]> {
    return this.repository.getUsers();
  }
  async validateEmail(email: string): Promise<boolean> {
    return this.repository.validateEmail(email);
  }
  async validateUsername(username: string): Promise<boolean> {
    return this.repository.validateUsername(username);
  }
  async validatePassword(password: string): Promise<boolean> {
    return this.repository.validatePassword(password);
  }
  async userValidations(user: User): Promise<boolean> {
    return this.repository.userValidations(user);
  }
}
