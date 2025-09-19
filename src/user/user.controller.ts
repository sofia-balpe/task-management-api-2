import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') //define a rota /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Get('find')
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id') //vai achar o usuário pelo número do id, tipo 'users/1'
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.update(id, data);
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    //ParseIntPipe é usado para converter o id para number, pois ele chega como string
    await this.userService.remove(id);
    return { message: 'Usuário removido' };
  }
}
