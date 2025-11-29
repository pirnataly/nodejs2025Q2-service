import { User } from '../users/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { Artist } from '../artists/interfaces/artists.interface';

@Injectable()
export class InMemoryStore {
  users: User[] = [];
  artists:Artist[] = [];
  albums = [];
  tracks = [];

  favorites = {
    artists: [],
    albums: [],
    tracks: [],
  }
}