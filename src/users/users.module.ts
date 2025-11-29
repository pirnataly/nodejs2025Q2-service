import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersStorage } from './store/users.storage';
import { StorageModule } from '../storage/storage.module';
import { UsersService } from './users.service';

@Module({
  imports: [StorageModule],
  controllers: [UsersController],
  providers: [UsersService,UsersStorage],

})
export class UsersModule {}
