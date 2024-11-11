import { Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { UserMicroservice } from '@app/common';

@Controller()
export class UserController implements UserMicroservice.UserServiceController{
  constructor(private readonly userService: UserService) {}

  getUserInfo(data: UserMicroservice.GetUserInfoRequest){
    return this.userService.getUserById(data.userId);
  }
}
