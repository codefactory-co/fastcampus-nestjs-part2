import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { PaymentMethod } from "../entity/payment.entity";

export class PaymentDto {
    @IsString()
    @IsNotEmpty()
    paymentMethod: PaymentMethod

    @IsString()
    @IsNotEmpty()
    paymentName: string;

    @IsString()
    @IsNotEmpty()
    cardNumber: string;

    @IsString()
    @IsNotEmpty()
    expiryYear: string;

    @IsString()
    @IsNotEmpty()
    expiryMonth: string;

    @IsString()
    @IsNotEmpty()
    birthOrRegistration: string;

    @IsString()
    @IsNotEmpty()
    passwordTwoDigits: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}