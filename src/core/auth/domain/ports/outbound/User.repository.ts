import { User } from '../../entities/User';

export interface UserRepository {
  findUser(username: string): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(username: string): Promise<User>;
  getUsers(): Promise<User[]>;
}
