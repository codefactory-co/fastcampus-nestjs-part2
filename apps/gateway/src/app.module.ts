import { Module } from "@nestjs/common";
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [OrderModule, UserModule, ProductModule]
})
export class AppModule { }