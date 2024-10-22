import { IsNotEmpty, IsString } from "class-validator";

export class DeliveryStartedDto{
    @IsString()
    @IsNotEmpty()
    id: string;
}