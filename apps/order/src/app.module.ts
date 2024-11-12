import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from 'joi';
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PAYMENT_SERVICE, PaymentMicroservice, PRODUCT_SERVICE, ProductMicroservice, traceInterceptor, USER_SERVICE, UserMicroservice } from "@app/common";
import { join } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                HTTP_PORT: Joi.number().required(),
                TCP_PORT: Joi.number().required(),
                USER_HOST: Joi.string().required(),
                USER_TCP_PORT: Joi.number().required(),
                DB_URL: Joi.string().required(),
                PRODUCT_HOST: Joi.string().required(),
                PRODUCT_TCP_PORT: Joi.number().required(),
                PAYMENT_HOST: Joi.string().required(),
                PAYMENT_TCP_PORT: Joi.number().required()
            })
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow('DB_URL'),
            }),
            inject: [ConfigService],
        }),
        ClientsModule.registerAsync({
            clients: [
                {
                    name: USER_SERVICE,
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.GRPC,
                        options: {
                            channelOptions: {
                                interceptors: [traceInterceptor('Order')],
                            },
                            package: UserMicroservice.protobufPackage,
                            protoPath: join(process.cwd(), 'proto/user.proto'),
                            url: configService.getOrThrow('USER_GRPC_URL'),
                        }
                    }),
                    inject: [ConfigService]
                },
                {
                    name: PRODUCT_SERVICE,
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.GRPC,
                        options: {
                            channelOptions: {
                                interceptors: [traceInterceptor('Order')],
                            },
                            package: ProductMicroservice.protobufPackage,
                            protoPath: join(process.cwd(), 'proto/product.proto'),
                            url: configService.getOrThrow('PRODUCT_GRPC_URL'),
                        }
                    }),
                    inject: [ConfigService]
                },
                {
                    name: PAYMENT_SERVICE,
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.GRPC,
                        options: {
                            channelOptions: {
                                interceptors: [traceInterceptor('Order')],
                            },
                            package: PaymentMicroservice.protobufPackage,
                            protoPath: join(process.cwd(), 'proto/payment.proto'),
                            url: configService.getOrThrow('PAYMENT_GRPC_URL'),
                        }
                    }),
                    inject: [ConfigService]
                },
            ],
            isGlobal: true,
        }),
        OrderModule
    ]
})
export class AppModule { }