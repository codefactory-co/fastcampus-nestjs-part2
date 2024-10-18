import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    _id: false
})
export class DeliveryAddress {
    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    street: string;

    @Prop({
        required: true,
    })
    city: string;

    @Prop({
        required: true,
    })
    postalCode: string;

    @Prop({
        required: true,
    })
    country: string;
}

export const DeliveryAddressSchema = SchemaFactory.createForClass(DeliveryAddress);