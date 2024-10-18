import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from 'joi';
import { PaymentModule } from "./payment/payment.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DB_URL: Joi.string().required(),
            })
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService)=> ({
                type: 'postgres',
                url: configService.getOrThrow('DB_URL'),
                autoLoadEntities: true,
                synchronize: true,
            }),
            inject: [ConfigService]
        }),
        PaymentModule,
    ],
})
export class AppModule { }
