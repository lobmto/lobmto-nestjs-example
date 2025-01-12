import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class MeaningRequest {
  @IsString()
  meaning: string;
}

export class RegisterWordRequest {
  @IsString()
  word: string;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MeaningRequest)
  meaningList: MeaningRequest[];

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

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => MeaningRequest)
  meaningList?: MeaningRequest[];

  @IsArray()
  @IsUUID(undefined, { each: true })
  @IsOptional()
  @ArrayUnique()
  @ArrayMaxSize(5)
  tagIdList?: string[];
}
