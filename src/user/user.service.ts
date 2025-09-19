import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Funcao } from 'src/funcao/funcao.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>, //objeto da entity User
    @InjectRepository(Funcao)
    private funcaoRepo: Repository<Funcao>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.userRepo.findOneBy({
      email: createUserDto.email,
    });

    if (exists) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const hashed = await bcrypt.hash(createUserDto.password, 10);

    //Procurar o id Da Função
    const funcao = await this.funcaoRepo.findOne({
      where: { id: createUserDto.idFuncao },
    });

    //Se o Id Da Função não existir:
    if (!funcao) {
      throw new NotFoundException(
        `Função com id ${createUserDto.idFuncao} não encontrada`,
      );
    }

    //Cria o objeto do user junto com o id da função:
    const user = this.userRepo.create({
      name: createUserDto.name,
      email: createUserDto.email,
      age: createUserDto.age,
      password: hashed,
      funcao,
    });

    //salva:
    return this.userRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    return this.userRepo.save({ ...user, ...dto });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.delete(user);
  }
}
