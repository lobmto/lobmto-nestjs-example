import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class RegisterWordRequest {
  @IsString()
  word: string;

  @IsString()
  meaning: string;

  @IsArray()
  @ArrayUnique()
  @ArrayMaxSize(5)
  @IsUUID(undefined, { each: true })
  tagIdList: string[];
}

export class WordIdRequest {
  @IsUUID()
  id: string;
}

export class UpdateWordRequest {
  @IsString()
  @IsOptional()
  word?: string;

  @IsString()
  @IsOptional()
  meaning?: string;

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ArrayUnique()
  @ArrayMaxSize(5)
  tagIdList?: string[];
}
