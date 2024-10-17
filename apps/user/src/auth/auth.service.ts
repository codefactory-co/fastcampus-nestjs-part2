import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register-dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
    ){}

    async register(rawToken: string, registerDto: RegisterDto){
        const {email, password} = this.parseBasicToken(rawToken);

        return this.userService.create({
            ...registerDto,
            email,
            password,
        });
    }

    parseBasicToken(rawToken: string){
        /// Bearer $token
        const basicSplit = rawToken.split(' ')

        if(basicSplit.length !== 2){
            throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
        }

        const [basic, token] = basicSplit;

        if(basic.toLowerCase() !== 'basic'){
            throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
        }

        const decoded = Buffer.from(token, 'base64').toString('utf-8');

        /// username:password
        const tokenSplit = decoded.split(':')

        if(tokenSplit.length !== 2){
            throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
        }

        const [email, password] = tokenSplit;

        return {
            email,
            password,
        }
    }
}
