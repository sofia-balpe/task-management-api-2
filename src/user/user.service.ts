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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>, //objeto da entity User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.userRepo.findOneBy({
      email: createUserDto.email,
    });

    if (exists) {
      throw new ConflictException('Usuário já cadastrado');
    }

    const hashed = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({ ...createUserDto, password: hashed });

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
