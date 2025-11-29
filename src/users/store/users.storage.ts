import { randomUUID } from 'crypto';
import { UserStorage } from '../interfaces/user-storage.interface';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { InMemoryStore } from '../../storage/in-memory.store';


@Injectable()
export class UsersStorage implements UserStorage {
  constructor(private readonly store: InMemoryStore){
  }

  create(params: CreateUserDto) {
    const {login, password} = params;
    const exists = this.store.users.find(user => user.login === login);
    if (exists) {
      throw new ConflictException('User already exists');
    }
    const newUser:User = {login:login,password:password, id: randomUUID(),version:1, createdAt:new Date().getTime(),updatedAt: new Date().getTime() };
    this.store.users.push(newUser);
    return newUser;
  }

  getById(id: string) {
    return this.store.users.find(user => user.id === id);
  }

  getAll(){
      return this.store.users;
  };

  update(id: string,params:UpdateUserDto) {
    const userToUpdate = this.getById(id);
    const updatedIndex= this.store.users.indexOf(userToUpdate);
    const updatedUser = {...userToUpdate,password:params.newPassword,version:++userToUpdate.version ,updatedAt:new Date().getTime()};
    this.store.users[updatedIndex]=updatedUser;
    const {password, ...updatedUserToShow}=updatedUser;
    return updatedUserToShow;
  }

  delete(id:string) {
    this.store.users = this.store.users.filter(user => user.id !== id);
  }
}