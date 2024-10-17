import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    /// 사용자에 대한 설명
    /// 직접 작성함
    @IsString()
    @IsNotEmpty()
    profile: string;
}