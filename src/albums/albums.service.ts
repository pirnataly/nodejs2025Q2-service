import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsStorage } from './store/albums.storage';

@Injectable()
export class AlbumsService {
  constructor(public storage: AlbumsStorage) {
  }
  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create(createAlbumDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    const album= this.storage.getById(id);
    if (!album) {
      throw new NotFoundException(`The album doesn't exist`);
    }

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album= this.storage.getById(id);
    if (!album) {
      throw new NotFoundException(`The album doesn't exist`);
    }
    return this.storage.update(id,updateAlbumDto);

  }

  remove(id: string) {
    if(this.storage.getById(id)){
      this.storage.delete(id);
    }else {
      throw new NotFoundException(`The album doesn't exist`);
    }

  }
}
