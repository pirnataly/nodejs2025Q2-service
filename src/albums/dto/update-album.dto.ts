import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsInt, IsOptional, IsString, IsUUID, Min, ValidateIf } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1900)
  year?: number;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId?: string | null;
}
