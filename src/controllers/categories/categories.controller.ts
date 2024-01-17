import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AllowUnauthenticatedRequest } from '@app/common/presentation/decorators/decorator';
import { CreateCategoryDto } from '../../domain/dtos/categories/create-category.dto';
import { CategoryDto } from '../../domain/dtos/categories/category.dto';
@ApiTags('Categories')
@AllowUnauthenticatedRequest()
@Controller('categories')
export class CategoriesController {
  @Get()
  @AllowUnauthenticatedRequest()
  @ApiOkResponse({
    type: CategoryDto,
    description: 'Categories list',
    isArray: true,
  })
  find() {
    return 'Categories retrieved';
  }

  @Get('/:id')
  findOne(@Param('id') id: string): CategoryDto | any {
    return `retieved category ${id}`;
  }
  @Post()
  create(@Body() props: CreateCategoryDto) {
    return props;
  }

  @Patch()
  update(@Body() props: any) {
    return props;
  }

  @Delete()
  delete(@Param('id') id: string) {
    return `Deleted ${id} successfully`;
  }
}
