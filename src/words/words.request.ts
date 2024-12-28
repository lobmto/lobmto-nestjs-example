import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RegisterWordRequest {
  @IsString()
  word: string;

  @IsString()
  meaning: string;
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
}
