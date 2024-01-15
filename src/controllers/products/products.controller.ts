import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsUseCases } from '../../use-cases/products/products.use-cases';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { UpdateProductDto } from '../../domain/dtos/products/update-product.dto';
import {
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductDTO } from '../../domain/dtos/products/product.dto';
import { AllowUnauthenticatedRequest } from '@app/common/utils/decorators/decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsUseCases) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /**
   *
   * @returns returns list of seeded users
   */

  @Post('seed')
  // @ApiExcludeEndpoint()
  @ApiCreatedResponse({ description: 'List of products created' })
  @ApiInternalServerErrorResponse({ description: 'Something went wrong' })
  seedProductsDb() {
    return this.productsService.seedDb();
  }

  @Get()
  @ApiOkResponse({
    type: ProductDTO,
    description: 'Products list',
    isArray: true,
  })
  @AllowUnauthenticatedRequest()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @AllowUnauthenticatedRequest()
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
