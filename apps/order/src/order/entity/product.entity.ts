import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    _id: false,
})
export class Product {
    @Prop({
        required: true,
    })
    productId: string;

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);