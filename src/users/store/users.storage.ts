import { randomUUID } from 'crypto';
import { UserStorage } from '../interfaces/user-storage.interface';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

import {  UserParams } from '../interfaces/user-params.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
class InMemoryStore implements UserStorage {
  public users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  create(params: UserParams) {
    const newUser = { ...params, id: randomUUID() };
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
    if (!id) {
      return 'userId is invalid'
    }
    else {
      const updatedUser = this.users.find(user => user.id === id);
      if (!updatedUser) {
        return `record with id =${id} does not exist`
      }
      else {
        if(updatedUser.password!==params.oldPassword){
          return `oldPassword is wrong`
        }
        else {
          return 'updated'
        }
      }

    }
  }
  delete(id:string) {
    return this.users.filter(user => user.id !== id);
  }
}