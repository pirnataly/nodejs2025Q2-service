import { CreateArtistDto } from '../dto/create-artist.dto';
import { Artist } from './artists.interface';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export interface ArtistStorageInterface {
  create: (params: CreateArtistDto) => Artist;
  getById: (id: string) => Artist|undefined;
  getAll: () => Artist[];
  update: (id:string,params: UpdateArtistDto) => Artist;
  delete: (id: string) => void;
}