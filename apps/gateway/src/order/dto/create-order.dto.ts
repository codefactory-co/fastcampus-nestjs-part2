import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { AddressDto } from "./address.dto";
import { PaymentDto } from "./payment.dto";

export class CreateOrderDto{
    @IsArray()
    @IsString({each: true})
    @IsNotEmpty({each: true})
    productIds: string[]

    @ValidateNested()
    @Type(()=> AddressDto)
    @IsNotEmpty()
    address: AddressDto;

    @ValidateNested()
    @Type(()=> PaymentDto)
    @IsNotEmpty()
    payment: PaymentDto
}