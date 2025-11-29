import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { StorageModule } from '../storage/storage.module';
import { AlbumsStorage } from './store/albums.storage';

@Module({
  imports: [StorageModule],
  controllers: [AlbumsController],
  providers: [AlbumsService,AlbumsStorage],
})
export class AlbumsModule {}
