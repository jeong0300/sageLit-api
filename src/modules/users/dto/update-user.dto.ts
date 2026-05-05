import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { CurationMode } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  displayName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  locale?: string;

  @IsOptional()
  @IsEnum(CurationMode)
  curationMode?: CurationMode;
}
