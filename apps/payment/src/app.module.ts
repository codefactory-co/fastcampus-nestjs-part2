import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from 'joi';
import { PaymentModule } from "./payment/payment.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { NOTIFICATION_SERVICE, NotificationMicroservice } from "@app/common";
import { join } from "path";
import { traceInterceptor } from "@app/common";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DB_URL: Joi.string().required(),
                TCP_PORT: Joi.number().required(),
                NOTIFICATION_HOST: Joi.string().required(),
                NOTIFICATION_TCP_PORT: Joi.number().required()
            })
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.getOrThrow('DB_URL'),
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService]
        }),
        ClientsModule.registerAsync({
            clients: [
                {
                    name: NOTIFICATION_SERVICE,
                    useFactory: (configService: ConfigService) => ({
                        transport: Transport.GRPC,
                        options: {
                            channelOptions: {
                                interceptors: [traceInterceptor('Payment')],
                            },
                            package: NotificationMicroservice.protobufPackage,
                            protoPath: join(process.cwd(), 'proto/notification.proto'),
                            url: configService.getOrThrow('NOTIFICATION_GRPC_URL'),
                        }
                    }),
                    inject: [ConfigService]
                },
            ],
            isGlobal: true,
        }),
        PaymentModule,
    ],
})
export class AppModule { }
