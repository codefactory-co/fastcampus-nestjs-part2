import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('post')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
