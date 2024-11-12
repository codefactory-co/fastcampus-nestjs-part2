import { Controller, Get, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationMicroservice, RpcInterceptor } from '@app/common';
import { SendPaymentNotificationDto } from './dto/send-payment-notification.dto';

@Controller()
@NotificationMicroservice.NotificationServiceControllerMethods()
export class NotificationController implements NotificationMicroservice.NotificationServiceController {
  constructor(private readonly notificationService: NotificationService) { }

  async sendPaymentNotification(request: SendPaymentNotificationDto) {
    const resp = (await this.notificationService.sendPaymentNotification(request)).toJSON();

    return {
      ...resp,
      status: resp.status.toString(),
    }
  }
}
