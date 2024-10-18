import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    _id: false,
})
export class Customer {
    @Prop({
        required: true,
    })
    userId: string;

    @Prop({
        required: true,
    })
    email: string;

    @Prop({
        required: true,
    })
    name: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);