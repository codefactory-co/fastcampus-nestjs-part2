import { Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { MakePaymentDto } from './dto/make-payment.dto';
import { GrpcInterceptor, PaymentMicroservice } from '@app/common';
import { PaymentMethod } from './entity/payment.entity';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@PaymentMicroservice.PaymentServiceControllerMethods()
@UseInterceptors(GrpcInterceptor)
export class PaymentController implements PaymentMicroservice.PaymentServiceController {
  constructor(private readonly paymentService: PaymentService) { }

  makePayment(request: PaymentMicroservice.MakePaymentRequest, metadata: Metadata) {
    return this.paymentService.makePayment({
      ...request,
      paymentMethod: request.paymentMethod as PaymentMethod,
    }, metadata);
  }
}
