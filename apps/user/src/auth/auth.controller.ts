import { Body, Controller, Post, UnauthorizedException, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { ParseBearerTokenDto } from './dto/parse-bearer-token.dto';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { LoginDto } from './dto/login.dto';
import { GrpcInterceptor, UserMicroservice } from '@app/common'
import { Metadata } from '@grpc/grpc-js';

@Controller('auth')
@UserMicroservice.AuthServiceControllerMethods()
@UseInterceptors(GrpcInterceptor)
export class AuthController implements UserMicroservice.AuthServiceController {
  constructor(private readonly authService: AuthService) { }

  parseBearerToken(request: UserMicroservice.ParseBearerTokenRequest) {
    return this.authService.parseBearerToken(request.token, false);
  }

  registerUser(request: UserMicroservice.RegisterUserRequest) {
    const { token } = request;

    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!');
    }

    return this.authService.register(token, request);
  }

  loginUser(request: UserMicroservice.LoginUserRequest, metadata: Metadata) {
    const { token } = request;
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!')
    }

    return this.authService.login(token);
  }
}
