import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryStore } from './store/users.storage';


@Injectable()
export class UsersService {
  constructor(public storage: InMemoryStore) {
  }

  create(createUserDto: CreateUserDto) {
    const { password, ...noPasswordUser } = this.storage.create(createUserDto);
    return noPasswordUser;
  }

  findAll() {
    const allUsers = this.storage.getAll();
    return allUsers.map(({ password, ...noPasswordUser }) => noPasswordUser);
  }

  findOne(id: string) {
    const result = this.storage.getById(id);
    if (!result) {
      throw new NotFoundException('User with this id does not exist');
    }
    const { password, ...user } = result;
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user= this.storage.getById(id);
    if (!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    if (user && user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('OldPassword is wrong');
    }
    return this.storage.update(id, updateUserDto);
   }

  remove(id: string) {
    const user= this.storage.getById(id);
    if(!user) {
      throw new NotFoundException('User with this id does not exist');
    }
    this.storage.delete(id);
  }
}
