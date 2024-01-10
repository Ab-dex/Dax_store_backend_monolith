import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { TYPE } from 'src/Constants';
import { Result } from '@app/common/domain/result';
import { ProductDTO } from './dto/product.dto';
import { ProductEntity } from './entities/product.entity';
import { initProducts } from 'src/seeds/products';
import { IProductRepository } from './repository/product-repo.interface';
import { IProductMapper } from 'src/mappers/product-mapper.interface';
import { Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { IProductEntity } from './entities/product-entity.interface';

@Injectable()
export class ProductsService {

  constructor(
    @Inject(TYPE.IProductsRepository) private productsRepository: IProductRepository,
    @Inject(TYPE.IProducMapper) private mapper: IProductMapper
  ) {
    
  }

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async seedDb(): Promise<Result<ProductDTO[]>> {


    const doc = initProducts.map((product) => this.mapper.toModelData(ProductEntity.create({ ...product, brandImage: product.images[0] }).getValue()))

    const returnedSeeds = (await this.productsRepository.insertMany(doc)).getValue()


    const serializedProduct = returnedSeeds.map((seed: IProductEntity) => {
      const { id, productName, sizes, description, brandImage, images, price, quantity } = seed
      
      console.log(id)
      return plainToInstance(ProductDTO, {id: id.toHexString(), name: productName, sizes, description, brandImage, images, price, quantity})
    })
    return Result.ok(serializedProduct)
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
