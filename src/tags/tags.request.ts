import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RegisterTagRequest {
  @IsString()
  name: string;
}

export class TagIdRequest {
  @IsUUID()
  id: string;
}

export class UpdateTagRequest {
  @IsString()
  @IsOptional()
  name?: string;
}
