import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ){}

  async createSamples(){
    const data = [
      {
        name: '사과',
        price: 1000,
        description: '맛있는 청주사과',
        stock: 2,
      },
      {
        name: '메론',
        price: 2000,
        description: '머스크 메론',
        stock: 1,
      },
      {
        name: '수박',
        price: 3000,
        description: '씨없는 수박',
        stock: 10,
      },
      {
        name: '브로콜리',
        price: 2000,
        description: '맛없는 브로콜리',
        stock: 0,
      },
      {
        name: '바나나',
        price: 1500,
        description: '노란 바나나',
        stock: 3,
      }
    ]

    await this.productRepository.save(data);

    return true;
  }
}
