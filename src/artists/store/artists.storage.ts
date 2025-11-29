import { ArtistStorageInterface } from '../interfaces/artist-storage.interface';
import { InMemoryStore } from '../../storage/in-memory.store';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { ConflictException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../interfaces/artists.interface';

@Injectable()
export class ArtistsStorage implements ArtistStorageInterface {
  constructor(public storage: InMemoryStore) {
  }

  create(params: CreateArtistDto) {
    const { name, grammy } = params;
    const exists = this.storage.artists.find(artist => artist.name === name);
    if (exists) {
      throw new ConflictException('Artist already exists');
    }
    const newArtist: Artist = { name: name, grammy: grammy, id: randomUUID() };
    this.storage.artists.push(newArtist);
    return newArtist;
  } ;

  getById(id: string) {
    return this.storage.artists.find(artist => artist.id === id);
  }

  getAll() {
    return this.storage.artists;
  };

  update(id: string, params: UpdateArtistDto) {
    const artist = this.storage.artists.find(artist => artist.id === id);
    const artistIndex = this.storage.artists.findIndex(artPerson => artPerson === artist);
    if (params.name) {
      artist.name = params.name;
    }
    if (params.grammy!==artist.grammy) {
      artist.grammy = params.grammy;
    }
    this.storage.artists[artistIndex] = artist;
    return artist;
  };

  delete(id: string) {
    this.storage.artists = this.storage.artists.filter(artist => artist.id !== id);
  };

}