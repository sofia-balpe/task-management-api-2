/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/user/user.entity';

@Entity('Funcao')
export class Funcao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.funcao)
  users: User[];
}
