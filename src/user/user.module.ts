import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcao } from 'src/funcao/funcao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Funcao])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
