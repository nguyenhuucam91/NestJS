import { CategoryService } from './category.service';
import { Body, Controller, Get, Param, Post, Put, UseFilters, UseInterceptors } from "@nestjs/common";
import { CategoryUpdateDTO, CategoryCreateDTO } from './dtos/category.dto';
import { Transaction } from 'src/decorators/transaction.decorator';
import { ExtendedUnprocessableEntityFilter } from 'src/filters/extended-unprocessable.filter';
import { DatabaseTransactionInterceptor } from 'src/interceptors/database-transaction.interceptor';

@Controller('categories')
export class CategoryController { 

  constructor(private categoryService: CategoryService) {}

  @Get()
  index() {
    return this.categoryService.all();
  }

  @Post('create')
  // @UseInterceptors(ErrorsInterceptor)
  @UseFilters(ExtendedUnprocessableEntityFilter)
  create(@Body() categoryCreateDto: CategoryCreateDTO) { 
      return this.categoryService.create(categoryCreateDto);
  }

  @Put('update/:id')
  update(
    @Param('id') id: number,
    @Body() categoryUpdateDTO: CategoryUpdateDTO,
  ) { 
    this.categoryService.update(categoryUpdateDTO, id);
    // return true
  }

  @UseInterceptors(DatabaseTransactionInterceptor)
  @Get('transaction')
  transaction(@Transaction() transaction) {
    return this.categoryService.createTransaction(transaction)
  }
}