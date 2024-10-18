import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
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

    async parseBearerToken(rawToken: string, isRefreshToken: boolean){
        /// Bearer token
        const basicSplit = rawToken.split(' ')

        if(basicSplit.length !== 2){
            throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
        }

        const [bearer, token] = basicSplit;

        if(bearer.toLowerCase() !== 'bearer'){
            throw new BadRequestException('토큰 포맷이 잘못됐습니다!');
        }

        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.getOrThrow<string>(
                        isRefreshToken ? 'REFRESH_TOKEN_SECRET': 'ACCESS_TOKEN_SECRET',
                    )
                }
            )

            if(isRefreshToken){
                if(payload.type !== 'refresh'){
                    throw new BadRequestException('Refresh 토큰을 입력해주세요!');
                }
            }else{
                if(payload.type !== 'access'){
                    throw new BadRequestException('Access 토큰을 입력해주세요!');
                }
            }

            return payload;
        }catch(e){
            throw new UnauthorizedException('토큰이 만료됐습니다!');
        }
    }

    async login(rawToken: string){
        const {email, password} = this.parseBasicToken(rawToken);

        const user = await this.authenticate(email, password);

        return {
            refreshToken: await this.issueToken(user, true),
            accessToken: await this.issueToken(user, false),
        }
    }

    async authenticate(email: string, password: string){
        const user = await this.userRepository.findOne({
            where:{
                email,
            },
            select:{
                id: true,
                email: true,
                password: true,
            }
        });

        if(!user){
            throw new BadRequestException('잘못된 로그인 정보입니다!');
        }

        const passOk = await bcrypt.compare(password, user.password);

        if(!passOk){
            throw new BadRequestException('잘못된 로그인 정보입니다!');
        }

        return user;
    }

    async issueToken(user: any, isRefreshToken: boolean){
        const refreshTokenSecret = this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET');
        const accessTokenSecret = this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET');

        return this.jwtService.signAsync({
            sub: user.id ?? user.sub,
            role: user.role,
            type: isRefreshToken ? 'refresh' : 'access'
        }, {
            secret: isRefreshToken ? refreshTokenSecret : accessTokenSecret,
            expiresIn: '3600h'
        })
    }
}
