import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { ArtistsStorage } from './store/artists.storage';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [ArtistsController],
  providers: [ArtistsService,ArtistsStorage],
})
export class ArtistsModule {}
