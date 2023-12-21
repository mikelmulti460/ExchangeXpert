import { User } from '../entities/User';
import { UserService } from '../ports/inbound/UserService';
import { UserRepository } from '../ports/outbound/User.repository';
import { UserServiceError } from '../../shared/error/UserService.error';
import { UserApplicationError } from '../../shared/error/UserApplication.error';

export class UserDomainService implements UserService {
  constructor(private repository: UserRepository) {}
  async findUser(username: string): Promise<User> {
    const user = await this.repository.findUser(username);
    if (!user) {
      throw new UserServiceError('User not found');
    }
    return user;
  }

  async createUser(user: User): Promise<User> {
    const userExists = await this.repository.findUser(user.username);
    if (userExists) {
      throw new UserServiceError('User already exists');
    }
    await this.userValidations(user);
    return this.repository.createUser(user);
  }

  async updateUser(user: User): Promise<User> {
    const userExists = await this.repository.findUser(user.username);
    if (!userExists) {
      throw new UserServiceError('User not found');
    }
    await this.userValidations(user);
    return this.repository.updateUser(user);
  }

  async deleteUser(username: string): Promise<User> {
    const user = await this.repository.findUser(username);
    if (!user) {
      throw new UserServiceError('User not found');
    }
    return this.repository.deleteUser(username);
  }

  async getUsers(): Promise<User[]> {
    return this.repository.getUsers();
  }

  async validateEmail(email: string): Promise<boolean> {
    // Expresión regular para verificar que el correo
    // tenga el formato correcto
    const res =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return res.test(String(email).toLowerCase());
  }
  async validateUsername(username: string): Promise<boolean> {
    if (username.length > 16) {
      return false;
    }

    // Expresión regular para verificar que el nombre de usuario
    // sólo contenga letras minúsculas y números
    const regex = /^[a-z0-9]+$/;

    return regex.test(username);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hasUpperCase = /[A-Z]/.test(password);

    const hasLetter = /[A-Za-z]/.test(password);

    // Verificar si la contraseña contiene al menos un carácter especial
    // Los caracteres especiales en este caso son definidos por el conjunto [!@#$%^&*(),.?":{}|<>]
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLetter && hasSpecialChar;
  }

  async userValidations(user: User): Promise<boolean> {
    switch (true) {
      case !(await this.validateEmail(user.email)):
        throw new UserApplicationError('Invalid email');
      case !(await this.validateUsername(user.username)):
        throw new UserServiceError(
          'Invalid username, only lowercase letters, numbers and length less than 16 characters are allowed',
        );
      case !(await this.validatePassword(user.password)):
        throw new UserServiceError(
          'Invalid password, it must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        );
    }
    return true;
  }
}
