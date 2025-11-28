import { User } from './user.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface UserStorage {
  create: (params: CreateUserDto) => User;
  getById: (id: string) => User|undefined;
  getAll: () => User[]|string;
  update: (id:string,params: UpdateUserDto) => Omit<User,'password'>;
  delete: (id: string) => void;
}