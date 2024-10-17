import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createUserDto: CreateUserDto){
    const {email, password} = createUserDto;

    const user = await this.userRepository.findOne({
      where:{
        email,
      }
    });

    if(user){
      throw new BadRequestException('이미 가입한 이메일 입니다!')
    }

    const hash = await bcrypt.hash(password, 10);

    await this.userRepository.save({
      ...createUserDto,
      email,
      password: hash,
    });

    return this.userRepository.findOne({
      where:{
        email,
      }
    });
  }
}
