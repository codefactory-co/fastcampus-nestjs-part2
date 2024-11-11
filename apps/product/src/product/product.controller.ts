import { Controller, Get, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetProductsInfo } from './dto/get-products-info.dto';
import { RpcInterceptor } from '@app/common/interceptor/rpc.interceptor';
import { ProductMicroservice } from '@app/common';

@Controller('product')
export class ProductController implements ProductMicroservice.ProductServiceController {
  constructor(private readonly productService: ProductService) { }

  async createSamples() {
    const resp = await this.productService.createSamples();

    return {
      success: resp,
    }
  }

  async getProductsInfo(@Payload() data: GetProductsInfo) {
    const resp = await this.productService.getProductsInfo(data.productIds);

    return {
      products: resp,
    }
  }
}
