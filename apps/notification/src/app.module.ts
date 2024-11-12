import { ORDER_SERVICE, OrderMicroservice, traceInterceptor } from "@app/common";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from 'joi';
import { NotificationModule } from "./notification/notification.module";
import { join } from "path";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DB_URL: Joi.string().required(),
                TCP_PORT: Joi.number().required(),
                ORDER_HOST: Joi.string().required(),
                ORDER_TCP_PORT: Joi.string().required(),
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
                    name: ORDER_SERVICE,
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.GRPC,
                        options: {
                            channelOptions: {
                                interceptors: [traceInterceptor('Notification')],
                            },
                            package: OrderMicroservice.protobufPackage,
                            protoPath: join(process.cwd(), 'proto/order.proto'),
                            url: configService.getOrThrow('ORDER_GRPC_URL'),
                        }
                    }),
                    inject: [ConfigService]
                },
            ],
            isGlobal: true,
        }),
        NotificationModule,
    ],
})
export class AppModule { }