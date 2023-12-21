import { UserDTO } from '../shared/dto/userDTO';
export interface UserApplication {
  createUser(user: UserDTO): Promise<UserDTO>;
  updateUser(user: UserDTO): Promise<UserDTO>;
  deleteUser(username: string): Promise<UserDTO>;
  getUsers(): Promise<UserDTO[]>;
  findUser(username: string): Promise<UserDTO>;
}
