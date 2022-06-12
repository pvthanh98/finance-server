import { IsString, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  category: string;

  @IsString()
  date: string;

  @IsString()
  description: string;

  @IsNumber()
  amount: string;
}