import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcao } from './funcao.entity';
import { FuncaoService } from './funcao.service';
import { FuncaoController } from './funcao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Funcao])],
  providers: [FuncaoService],
  controllers: [FuncaoController],
  exports: [FuncaoService],
})
export class FuncaoModule {}
