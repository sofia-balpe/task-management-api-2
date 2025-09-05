import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsNumber()
  age: number;

  @Column({ nullable: true })
  password: string;
}
