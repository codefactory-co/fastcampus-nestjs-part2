import { Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { MakePaymentDto } from './dto/make-payment.dto';
import { PaymentMicroservice } from '@app/common';
import { PaymentMethod } from './entity/payment.entity';

@Controller()
export class PaymentController implements PaymentMicroservice.PaymentServiceController {
  constructor(private readonly paymentService: PaymentService) { }

  makePayment(payload: PaymentMicroservice.MakePaymentRequest) {
    return this.paymentService.makePayment({
      ...payload,
      paymentMethod: payload.paymentMethod as PaymentMethod,
    });
  }
}
