import { Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { GetUserInfoDto } from './dto/get-user-info.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd: 'get_user_info'})
  @UsePipes(ValidationPipe)
  @UseInterceptors(RpcInterceptor)
  getUserInfo(@Payload() data: GetUserInfoDto){
    return this.userService.getUserById(data.userId);
  }
}
