import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as Joi from 'joi';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                REFRESH_TOKEN_SECRET: Joi.string().required(),
                ACCESS_TOKEN_SECRET: Joi.string().required(),
                HTTP_PORT: Joi.number().required(),
                TCP_PORT: Joi.number().required(),
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
        UserModule,
        AuthModule,
    ],
})
export class AppModule { } 