import { USER_SERVICE, UserMicroservice } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService implements OnModuleInit {
    authService: UserMicroservice.AuthServiceClient;

    constructor(
        @Inject(USER_SERVICE)
        private readonly userMicroservice: ClientGrpc,
    ) { }

    onModuleInit() {
        this.authService = this.userMicroservice.getService<UserMicroservice.AuthServiceClient>(
            'AuthService',
        );
    }

    register(token: string, registerDto: RegisterDto) {
        return lastValueFrom(this.authService.registerUser({
            ...registerDto,
            token,
        }))
    }

    login(token: string) {
        return lastValueFrom(this.authService.loginUser({
            token,
        }))
    }
}
