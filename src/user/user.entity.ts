import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Funcao } from '../funcao/funcao.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  password: string;

  // @Column({ nullable: true })
  // id_funcao_fk: number;

  @ManyToOne(() => Funcao)
  @JoinColumn({ name: 'id_funcao_fk' })
  funcao: Funcao;
}
