import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  image: string;
}