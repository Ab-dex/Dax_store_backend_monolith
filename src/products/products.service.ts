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
import { plainToInstance } from 'class-transformer';
import { IProductEntity } from './entities/product-entity.interface';
import { IProductModel } from './model/product-model.interface';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(TYPE.IProductsRepository)
    private productsRepository: IProductRepository,
    @Inject(TYPE.IProducMapper) private mapper: IProductMapper,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async seedDb(): Promise<Result<ProductDTO[]>> {
    const doc: IProductModel[] = initProducts.map((product) =>
      this.mapper.toModelData(
        ProductEntity.create({
          ...product,
          brandImage: product.images[0],
        }).getValue(),
      ),
    );

    const returnedSeeds: IProductEntity[] = (
      await this.productsRepository.insertMany(doc)
    ).getValue();

    const serializedProduct = returnedSeeds.map((seed: IProductEntity) =>
      plainToInstance(ProductDTO, seed),
    );
    return Result.ok(serializedProduct);
  }

  async updateSeed(props: any): Promise<Result<any>> {
    // this.productsRepository.upsert()
    return Result.ok({});
  }

  async findAll() {
    const productsList: IProductEntity[] = (
      await this.productsRepository.findAll()
    ).getValue();

    const serializedProduct: ProductDTO[] = productsList.map((product) =>
      plainToInstance(ProductDTO, product),
    );

    return Result.ok(serializedProduct);
  }

  async findOne(id: string) {
    const product = (await this.productsRepository.findById(id)).getValue();

    return plainToInstance(ProductDTO, product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = (
      await this.productsRepository.findOneAndUpdate(id, updateProductDto)
    ).getValue();
    return Result.ok(plainToInstance(ProductDTO, product));
  }

  async remove(id: string) {
    const res = await this.productsRepository.deleteOne({ id });
    return Result.ok(res);
  }
}
