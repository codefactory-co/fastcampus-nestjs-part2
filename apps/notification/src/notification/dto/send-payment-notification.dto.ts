import { IsNotEmpty, IsString } from "class-validator";

export class SendPaymentNotificationDto {
    @IsString()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    orderId: string;
}