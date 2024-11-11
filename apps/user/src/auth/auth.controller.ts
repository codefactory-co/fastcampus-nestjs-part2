import { Body, Controller, Post, UnauthorizedException, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authorization } from '../../../gateway/src/auth/decorator/authorization.decorator';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { ParseBearerTokenDto } from './dto/parse-bearer-token.dto';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { LoginDto } from './dto/login.dto';
import { UserMicroservice } from '@app/common'

@Controller('auth')
export class AuthController implements UserMicroservice.AuthServiceController {
  constructor(private readonly authService: AuthService) { }

  parseBearerToken(payload: UserMicroservice.ParseBearerTokenRequest) {
    return this.authService.parseBearerToken(payload.token, false);
  }

  registerUser(registerDto: UserMicroservice.RegisterUserRequest) {
    const { token } = registerDto;

    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!');
    }

    return this.authService.register(token, registerDto);
  }

  loginUser(loginDto: UserMicroservice.LoginUserRequest) {
    const { token } = loginDto;
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!')
    }

    return this.authService.login(token);
  }
}
