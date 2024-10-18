import { Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { MakePaymentDto } from './dto/make-payment.dto';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern({cmd: 'make_payment'})
  @UsePipes(ValidationPipe)
  @UseInterceptors(RpcInterceptor)
  makePayment(@Payload() payload: MakePaymentDto){
    console.log(payload);
    return this.paymentService.makePayment(payload);
  }
}
