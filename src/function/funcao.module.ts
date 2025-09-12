import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcao } from './funcao.entity';
import { FunctionService } from './funcao.service';
import { FunctionController } from './funcao.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Funcao])],
  providers: [FunctionService],
  controllers: [FunctionController],
  exports: [FunctionService],
})
export class FunctionModule {}
