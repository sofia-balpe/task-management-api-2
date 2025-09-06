import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') //define a rota /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login') //o 'login' define a rota, ent vai ser /users/login
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  @Get('find')
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(({ password, ...u }) => u);
  }

  @Get(':id') //vai achar o usuário pelo número do id, tipo 'users/1'
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    const { password, ...result } = user;
    return result;
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    const user = await this.userService.update(id, dto);
    const { password, ...result } = this.userService;
    return result;
  }

  @Delete('delte/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.userService.remove(id);
    return { message: 'Usuário removido' };
  }
}
