import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Funcao } from './funcao/funcao.entity';
import { FuncaoModule } from './funcao/funcao.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'servidor01',
      database: 'task_management_api2',
      entities: [User, Funcao],
      //synchronize: true, //Vai criar as tabelas de forma automática
    }),
    UserModule,
    FuncaoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
