import { Body, Controller, Post } from '@nestjs/common';
import { FunctionService } from './funcao.service';
import { CreateFunctionDto } from './dto/create-function.dto';

@Controller('function')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @Post('register')
  async create(@Body() data: CreateFunctionDto) {
    return await this.functionService.create(data);
  }
}
