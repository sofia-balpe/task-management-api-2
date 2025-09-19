/* eslint-disable prettier/prettier */
import {
  IsString,
  MaxLength,
  IsEmail,
  IsOptional,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;

  @IsString()
  @MinLength(6, { message: 'A senha precisa ter ao menos 6 caracteres' })
  password: string;

  @IsInt()
  idFuncao: number;
}
