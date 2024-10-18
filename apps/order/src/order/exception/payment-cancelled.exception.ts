import { HttpException, HttpStatus } from "@nestjs/common";

export class PaymentCancelledExcpetion extends HttpException{
    constructor(message: any){
        super(message, HttpStatus.BAD_REQUEST);
    }
}