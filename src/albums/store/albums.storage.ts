import { AlbumsStorageInterface } from '../interfaces/albums-storage.interface';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { InMemoryStore } from '../../storage/in-memory.store';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Album } from '../interfaces/album.interface';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumsStorage implements AlbumsStorageInterface {
  constructor(public storage: InMemoryStore){}
  create (params: CreateAlbumDto) {
    const { name, year,artistId } = params;
    const exists = this.storage.albums.find((album:Album) => (album.name === name && album.artistId === artistId));
    if (exists) {
      throw new ConflictException('Album already exists');
    }

    if(!(this.storage.artists.find(artist=>artist.id===artistId)) && artistId!==null){
      throw new BadRequestException('Artist does not exist');
    }
      const newAlbum: Album = {  id: randomUUID(),...params };
      this.storage.albums.push(newAlbum);
      return newAlbum;
  }

  getById (id: string) {
  return this.storage.albums.find(album=>album.id===id)
  }

  getAll () {
    return this.storage.albums;
  }

   update (id:string,params: UpdateAlbumDto) {
     const index = this.storage.albums.findIndex(album => album.id === id);
     const updatedAlbum = { ...this.storage.albums[index], ...params };
     if (params.artistId) {
       if (!(this.storage.artists.find(artist => artist.id === params.artistId) || params.artistId === null)) {
         throw new BadRequestException('Artist with this artistId does not exist');
       } else {
         this.storage.albums[index] = updatedAlbum;
         return updatedAlbum
       }
     }
       this.storage.albums[index] = updatedAlbum;
       return updatedAlbum

   }
  delete(id: string){
    this.storage.albums=this.storage.albums.filter(album=>album.id!==id);

  };

}