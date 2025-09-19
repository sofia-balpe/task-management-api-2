import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcao } from './funcao.entity';
import { Repository } from 'typeorm';
import { CreateFuncaoDto } from './dto/create-funcao.dto';
import { UpdateFuncaoDto } from './dto/update-funcao.dto';

@Injectable()
export class FuncaoService {
  constructor(
    @InjectRepository(Funcao)
    private funcaoRepo: Repository<Funcao>,
  ) {}

  //############Register:##################
  async create(createFunctionDto: CreateFuncaoDto): Promise<Funcao> {
    const exists = await this.funcaoRepo.findOneBy({
      nome: createFunctionDto.nome,
    });

    if (exists) {
      throw new ConflictException('Função de usuário já cadastrada');
    }
    const newFuncao = this.funcaoRepo.create({ ...createFunctionDto });
    return this.funcaoRepo.save(newFuncao);
  }

  //############Find All###########
  async findAll(): Promise<Funcao[]> {
    return await this.funcaoRepo.find();
  }

  //#########Find One By ID############
  async findOne(id: number): Promise<Funcao> {
    const exists = await this.funcaoRepo.findOneBy({ id });
    if (!exists) {
      throw new NotFoundException('Função não encontrada');
    }
    return exists;
  }

  //############Update#################
  async update(id: number, dto: UpdateFuncaoDto): Promise<Funcao> {
    const exists = this.findOne(id);

    if (exists == null) {
      throw new NotFoundException('Função não encontrada');
    }

    return this.funcaoRepo.save({ ...dto });
  }

  //##################Delete###############
  async remove(id: number): Promise<void> {
    const funcao = await this.findOne(id);
    await this.funcaoRepo.delete(funcao);
    if (funcao == null) {
      throw new NotFoundException('Funcao não encontrada');
    }
  }
}
