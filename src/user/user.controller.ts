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

  @Post('register') //o 'login' define a rota, ent vai ser /users/login
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('DTO recebido no controller:', createUserDto);
    const user = await this.userService.create(createUserDto);
    const { ...result } = user;
    return result;
  }

  @Get('find')
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => {
      const { ...result } = user;
      return result;
    });
  }

  @Get(':id') //vai achar o usuário pelo número do id, tipo 'users/1'
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    const { ...result } = user;
    return result;
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, dto);
    const { ...result } = user;
    return result;
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
    return { message: 'Usuário removido' };
  }
}
