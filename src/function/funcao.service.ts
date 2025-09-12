import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcao } from './funcao.entity';
import { Repository } from 'typeorm';
import { CreateFunctionDto } from './dto/create-function.dto';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(Function)
    private functionRepo: Repository<Funcao>,
  ) {}

  //############Register:##################
  async create(createFunctionDto: CreateFunctionDto): Promise<Funcao> {
    const exists = await this.functionRepo.findOneBy({
      nome: createFunctionDto.nome,
    });

    if (exists) {
      throw new ConflictException('Função de usuário já cadastrada');
    }
    const newFunction = this.functionRepo.create({ ...createFunctionDto });
    return this.functionRepo.save(newFunction);
  }
}
