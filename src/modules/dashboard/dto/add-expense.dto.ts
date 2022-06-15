import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';

export class CreateExpenseDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Expense)
  expenses: Array<Expense>
}

class Expense {
  @IsString()
  category: string;

  @IsString()
  date: string;

  @IsString()
  description: string;

  @IsNumber()
  amount: string;
}

