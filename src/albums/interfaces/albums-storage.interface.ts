import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from './album.interface';

export interface AlbumsStorageInterface {
  create: (params: CreateAlbumDto) => Album;
  getById: (id: string) => Album|undefined;
  getAll: () => Album[];
  update: (id:string,params: UpdateAlbumDto) => void;
  delete: (id: string) => void;
}