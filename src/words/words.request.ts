import { IsString } from 'class-validator';

export class RegisterWordRequest {
  @IsString()
  word: string;

  @IsString()
  meaning: string;
}
