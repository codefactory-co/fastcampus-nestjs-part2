import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Authorization } from 'apps/user/src/auth/decorator/authorization.decorator';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(@Authorization() token: string, @Body() createOrderDto: CreateOrderDto){
    return this.orderService.createOrder(createOrderDto, token);
  }
}
