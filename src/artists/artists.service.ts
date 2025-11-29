import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsStorage } from './store/artists.storage';

@Injectable()
export class ArtistsService {

  constructor(public storage: ArtistsStorage) {
  }
  create(dto: CreateArtistDto) {
    return this.storage.create(dto);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    const artist = this.storage.getById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} is not found`);
    }
    return artist;
  }

  update(id: string, dto: UpdateArtistDto) {
    const artist = this.storage.getById(id);
    if(!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    return this.storage.update(id, dto);
  }

  remove(id: string) {
    const artist = this.storage.getById(id);
    if(!artist) {
      throw new NotFoundException(`Artist with id ${id} doesn't exist`);
    }
    return this.storage.delete(id);
  }
}
