import { randomUUID } from 'crypto';
import { UserStorage } from '../interfaces/user-storage.interface';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryStore implements UserStorage {
  public users: User[];

  constructor() {
    this.users = [];
  }

  create(params: CreateUserDto) {
    const {login, password} = params;
    const exists = this.users.find(user => user.login === login);
    if (exists) {
      throw new ConflictException('User already exists');
    }
    const newUser:User = {login:login,password:password, id: randomUUID(),version:1, createdAt:new Date().getTime(),updatedAt: new Date().getTime() };
    this.users.push(newUser);
    return newUser;
  }

  getById(id: string) {
    return this.users.find(user => user.id === id);
  }

  getAll(){
      return this.users;
  };

  update(id: string,params:UpdateUserDto) {
    const userToUpdate = this.getById(id);
    const updatedIndex= this.users.indexOf(userToUpdate);
    const updatedUser = {...userToUpdate,password:params.newPassword,version:++userToUpdate.version ,updatedAt:new Date().getTime()};
    this.users[updatedIndex]=updatedUser;
    const {password, ...updatedUserToShow}=updatedUser;
    return updatedUserToShow;
  }

  delete(id:string) {
    this.users = this.users.filter(user => user.id !== id);
  }
}