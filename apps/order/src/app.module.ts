import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from 'joi';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                HTTP_PORT: Joi.number().required(),
                DB_URL: Joi.string().required(),
            })
        }),
        MongooseModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                uri: configService.getOrThrow('DB_URL'),
            }),
            inject: [ConfigService],
        }),
        OrderModule
    ]
})
export class AppModule { }