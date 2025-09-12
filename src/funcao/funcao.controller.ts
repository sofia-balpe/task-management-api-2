import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FuncaoService } from './funcao.service';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';

@Controller('function')
export class FuncaoController {
  constructor(private readonly funcaoService: FuncaoService) {}

  @Post('register')
  async create(@Body() data: CreateFuncaoDto) {
    return await this.funcaoService.create(data);
  }

  @Get('')
  async findAll() {
    return await this.funcaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.funcaoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateFuncaoDto,
  ) {
    return await this.funcaoService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.funcaoService.remove(id);
    return { message: 'Usuário Removido' };
  }
}
