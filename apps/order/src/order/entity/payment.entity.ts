import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum PaymentMethod {
    creditCard = 'CreditCard',
    kakao = 'Kakao',
}

@Schema({
    _id: false,
})
export class Payment{
    @Prop()
    paymentId: string;

    @Prop({
        enum: PaymentMethod,
        default: PaymentMethod.creditCard,
    })
    paymentMethod: PaymentMethod;

    @Prop({
        required: true,
    })
    paymentName: string;

    @Prop({
        required: true,
    })
    amount: number;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);