import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/products/update-product.dto';
import { Result } from '@app/common/domain/result';
import { ProductDTO } from '../../domain/dtos/products/product.dto';
import { plainToInstance } from 'class-transformer';
import { IProductEntity } from '../../domain/entities/products/product-entity.interface';
import { ProductMapper } from '../../domain/mappers/Product.mapper';
import { IDataServices } from '../../domain/abstracts';
import { ProductEntity } from '../../domain';
import { initProducts } from '../../infrastructure/seeds/products';

@Injectable()
export class ProductsUseCases {
  constructor(
    private dataServices: IDataServices,
    private mapper: ProductMapper,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const uniqueImagesList = [
      ...new Set([
        ...createProductDto.images.splice(0, 0, createProductDto.brandImage),
      ]),
    ];
    const productEntity = ProductEntity.create({
      ...createProductDto,
      images: uniqueImagesList,
    }).getValue();
    const productDoc = this.mapper.toModelData(productEntity);
    const createdProduct = await this.dataServices.products.create(productDoc);
    return createdProduct;
  }

  async seedDb(): Promise<Result<ProductDTO[]>> {
    const doc = initProducts.map((product) =>
      this.mapper.toModelData(
        ProductEntity.create({
          ...product,
          brandImage: product.images[0],
        }).getValue(),
      ),
    );

    const returnedSeeds: IProductEntity[] = (
      await this.dataServices.products.insertMany(doc)
    ).getValue();

    const serializedProduct = returnedSeeds.map((seed: IProductEntity) =>
      plainToInstance(ProductDTO, seed),
    );
    return Result.ok(serializedProduct);
  }

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
