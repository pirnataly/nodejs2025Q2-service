import { User } from '../users/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { Artist } from '../artists/interfaces/artists.interface';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class InMemoryStore {
  users: User[] = [];
  artists:Artist[] = [];
  albums:Album[] = [];
  tracks = [];

  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  }
}