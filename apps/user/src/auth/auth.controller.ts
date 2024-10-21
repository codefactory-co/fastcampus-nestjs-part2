import { Body, Controller, Post, UnauthorizedException, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Authorization } from '../../../gateway/src/auth/decorator/authorization.decorator';
import { EventPattern, MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RegisterDto } from './dto/register.dto';
import { ParseBearerTokenDto } from './dto/parse-bearer-token.dto';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @Post('register')
  // @UsePipes(ValidationPipe)
  // registerUser(@Authorization() token: string, @Body() registerDto: RegisterDto){
  //   if(token === null){
  //     throw new UnauthorizedException('토큰을 입력해주세요!');
  //   }

  //   return this.authService.register(token, registerDto);
  // }

  // @Post('login')
  // @UsePipes(ValidationPipe)
  // loginUser(@Authorization() token: string){
  //   if(token === null){
  //     throw new UnauthorizedException('토큰을 입력해주세요!')
  //   }

  //   return this.authService.login(token);
  // }

  @MessagePattern({
    cmd: 'parse_bearer_token'
  })
  @UsePipes(ValidationPipe)
  @UseInterceptors(RpcInterceptor)
  parseBearerToken(@Payload() payload: ParseBearerTokenDto) {
    return this.authService.parseBearerToken(payload.token, false);
  }

  @MessagePattern({
    cmd: 'register'
  })
  registerUser(@Payload() registerDto: RegisterDto) {
    const { token } = registerDto;

    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!');
    }

    return this.authService.register(token, registerDto);
  }

  @MessagePattern({
    cmd: 'login'
  })
  loginUser(@Payload() loginDto: LoginDto) {
    const { token } = loginDto;
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!')
    }

    return this.authService.login(token);
  }
}
