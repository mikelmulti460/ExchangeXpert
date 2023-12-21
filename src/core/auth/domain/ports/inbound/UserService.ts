import { User } from '../../entities/User';

export interface UserService {
  findUser(username: string): Promise<User>;
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(username: string): Promise<User>;
  getUsers(): Promise<User[]>;
  validateEmail(email: string): Promise<boolean>;
  validateUsername(username: string): Promise<boolean>;
  validatePassword(password: string): Promise<boolean>;
  userValidations(user: User): Promise<boolean>;
}
