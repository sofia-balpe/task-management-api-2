import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users') //define a rota /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login') //o 'login' define a rota, ent vai ser /users/login
  create(@Body() user: Partial<User>) {
    return this.userService.create(user);
  }

  @Get('find')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id') //vai achar o usuário pelo número do id, tipo 'users/1'
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.userService.update(id, data);
  }

  @Delete('delte/:id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
