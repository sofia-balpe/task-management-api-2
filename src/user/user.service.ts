import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>, //objeto da entity User
  ) {}

  create(user: Partial<User> & { password?: string }) {
    //O partial indica que os atributos se tornam opcionais
    if (user.password) {
      return bcrypt.hash(user.password, 10).then((hashedPassword) => {
        const newUser = { ...user, password: hashedPassword };

        return this.userRepo.save(newUser);
      });
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<User>) {
    return this.userRepo.update(id, data);
  }

  delete(id: number) {
    return this.userRepo.delete(id);
  }
}
