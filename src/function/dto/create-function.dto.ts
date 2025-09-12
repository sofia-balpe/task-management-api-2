import { IsString, MaxLength } from 'class-validator';

export class CreateFunctionDto {
  @IsString()
  @MaxLength(100)
  nome: string;

  @IsString()
  @MaxLength(300)
  description: string;
}
