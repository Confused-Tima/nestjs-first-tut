import { IsOptional, IsString } from 'class-validator';

export class EditBookmarDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  descripttion?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
