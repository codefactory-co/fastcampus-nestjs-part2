import { IsNotEmpty, IsString } from "class-validator";

export class GetUserInfoDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
}