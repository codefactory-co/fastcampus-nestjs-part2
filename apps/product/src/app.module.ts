import { Module } from "@nestjs/common";
import { ProductModule } from "./product/product.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                HTTP_PORT: Joi.number().required(),
                DB_URL: Joi.string().required(),
                TCP_PORT: Joi.number().required(),
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
        ProductModule,
    ],
})
export class AppModule { }
