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

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Put()
  update(@Param('id') id: number, @Body() data: Partial<User>) {
    return this.userService.update(id, data);
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
