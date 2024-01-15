import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/products/update-product.dto';
import { TYPE } from '../../Constants';
import { Result } from '@app/common/domain/result';
import { ProductDTO } from '../../domain/dtos/products/product.dto';
import { ProductEntity } from '../../domain/entities/products/product.entity';
import { initProducts } from '../../seeds/products';
import { IProductRepository } from '../../products/repository/product-repo.interface';
import { IProductMapper } from '../../domain/mappers/product-mapper.interface';
import { plainToInstance } from 'class-transformer';
import { IProductEntity } from '../../domain/entities/products/product-entity.interface';
import { IProductModel } from '../../infrastructure/data-services/mongo/model/product-model/product-model.interface';
import { ProductMapper } from '../../domain/mappers/Product.mapper';
import { IDataServices } from '../../domain/abstracts';

@Injectable()
export class ProductsUseCases {
  constructor(
    private dataServices: IDataServices,
    private mapper: ProductMapper,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  // async seedDb(): Promise<Result<ProductDTO[]>> {
  //   const doc: IProductModel[] = initProducts.map((product) =>
  //     this.mapper.toModelData(
  //       ProductEntity.create({
  //         ...product,
  //         brandImage: product.images[0],
  //       }).getValue(),
  //     ),
  //   );
  //
  //   const returnedSeeds: IProductEntity[] = (
  //     await this.dataServices.products.insertMany(doc)
  //   ).getValue();
  //
  //   const serializedProduct = returnedSeeds.map((seed: IProductEntity) =>
  //     plainToInstance(ProductDTO, seed),
  //   );
  //   return Result.ok(serializedProduct);
  // }
  //
  // async updateSeed(props: any): Promise<Result<any>> {
  //   // this.dataServices.products.upsert()
  //   return Result.ok({});
  // }

  async findAll() {
    const productsList: IProductEntity[] = (
      await this.dataServices.products.findAll()
    ).getValue();

    const serializedProduct: ProductDTO[] = productsList.map((product) =>
      plainToInstance(ProductDTO, product),
    );

    return Result.ok(serializedProduct);
  }

  async findOne(id: string) {
    const product = (await this.dataServices.products.findById(id)).getValue();

    return plainToInstance(ProductDTO, product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = (
      await this.dataServices.products.findOneAndUpdate(id, updateProductDto)
    ).getValue();
    return Result.ok(plainToInstance(ProductDTO, product));
  }

  async remove(id: string) {
    const res = await this.dataServices.products.deleteOne({ id });
    return Result.ok(res);
  }
}
