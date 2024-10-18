import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  getHello(): string {
    return 'Hello World!';
  }
}
