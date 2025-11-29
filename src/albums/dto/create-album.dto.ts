import { IsDefined, IsInt, IsOptional, IsString, IsUUID, Min, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1900)
  year: number;

  @IsDefined()
  @ValidateIf((_, value) => value !== null)
  @IsUUID('4')
  artistId: string | null;

}
