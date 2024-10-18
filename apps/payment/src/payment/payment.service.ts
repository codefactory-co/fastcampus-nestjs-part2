import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from './entity/payment.entity';
import { Repository } from 'typeorm';
import { MakePaymentDto } from './dto/make-payment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {

  }

  async makePayment(payload: MakePaymentDto) {
    let paymentId;

    try {
      const result = await this.paymentRepository.save(payload);

      paymentId = result.id;

      await this.processPayment();

      await this.updatePaymentStatus(result.id, PaymentStatus.approved);

      /// TODO notification 보내기
      this.sendNotification(payload.orderId, payload.userEmail);

      return this.paymentRepository.findOneBy({id: result.id});
    } catch (e) {
      if(paymentId){
        await this.updatePaymentStatus(paymentId, PaymentStatus.rejected);
      }

      throw e;
    }

  }

  async processPayment() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  async updatePaymentStatus(id: string, status: PaymentStatus) {
    await this.paymentRepository.update({
      id,
    }, {
      paymentStatus: status,
    });
  }

  async sendNotification(orderId: string, to: string){
    const resp = await lastValueFrom(this.notificationService.send({cmd: 'send_payment_notification'}, {
      to,
      orderId,
    }))
  }
}
