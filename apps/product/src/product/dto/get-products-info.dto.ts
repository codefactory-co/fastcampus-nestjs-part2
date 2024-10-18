import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class GetProductsInfo {
    @IsArray()
    @IsNotEmpty()
    @IsString({ each: true })
    productIds: string[]
}