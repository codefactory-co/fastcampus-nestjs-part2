import { constructMetadata, ORDER_SERVICE, OrderMicroservice, UserMeta, UserPayloadDto } from '@app/common';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService implements OnModuleInit{
    orderService: OrderMicroservice.OrderServiceClient;

    constructor(
        @Inject(ORDER_SERVICE)
        private readonly orderMicroservice: ClientGrpc,
    ) { }

    onModuleInit() {
        this.orderService = this.orderMicroservice.getService<OrderMicroservice.OrderServiceClient>(
            'OrderService',
        )
    }

    async createOrder(createOrderDto: CreateOrderDto, userPayload: UserPayloadDto) {
        return this.orderService.createOrder({
            ...createOrderDto,
            meta:{
                user: userPayload,
            }
        }, constructMetadata(OrderService.name, 'createOrder'));
    }
}
