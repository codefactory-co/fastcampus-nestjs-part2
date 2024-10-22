import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { BearerTokenMiddleware } from '../auth/middleware/bearer-token.middleware';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule{
}
