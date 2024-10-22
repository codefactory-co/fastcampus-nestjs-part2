import { ORDER_SERVICE, UserMeta, UserPayloadDto } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @Inject(ORDER_SERVICE)
        private readonly orderMicroservice: ClientProxy
    ) { }

    async createOrder(createOrderDto: CreateOrderDto, userPayload: UserPayloadDto) {
        return this.orderMicroservice.send<any, CreateOrderDto & UserMeta>({
            cmd: 'create_order'
        }, {
            ...createOrderDto,
            meta:{
                user: userPayload,
            }
        });
    }
}
