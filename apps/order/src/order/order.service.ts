import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER_SERVICE } from '@app/common';
import { PaymentCancelledExcpetion } from './exception/payment-cancelled.exception';

@Injectable()
export class OrderService {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: ClientProxy
  ){

  }

  async createOrder(createOrderDto: CreateOrderDto, token: string) {
      /// 1) 사용자 정보 가져오기
      const user = await this.getUserFromToken(token);

      console.log(user);
      /// 2) 상품 정보 가져오기
      /// 3) 총 금액 계산하기
      /// 4) 금액 검증하기 - total이 맞는지 (프론트에서 보내준 데이터랑)
      /// 5) 주문 생성하기 - 데이터베이스에 넣기
      /// 6) 결제 시도하기
      /// 7) 주문 상태 업데이트하기
      /// 8) 결과 반환하기
  }

  async getUserFromToken(token: string){
    /// 1) User MS : JWT 토큰 검증
    const tResp = await lastValueFrom(this.userService.send({cmd: 'parse_bearer_token'}, {token}));

    if(tResp.status === 'error'){
      throw new PaymentCancelledExcpetion(tResp);
    }

    /// 2) User MS : 사용자 정보 가져오기
    const userId = tResp.data.sub;
    const uResp = await lastValueFrom(this.userService.send({cmd: 'get_user_info'}, {userId}));

    if(uResp.status === 'error'){
      throw new PaymentCancelledExcpetion(uResp);
    }

    return uResp.data;
  }
}
