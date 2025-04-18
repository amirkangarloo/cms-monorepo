import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateCustomerRequestDto,
  CustomerIdRequestDto,
  UpdateCustomerRequestDto,
} from 'apps/api/src/domains/customer/application/dto';
import { CustomerService } from 'apps/api/src/domains/customer/presentation/customer.service';

@Controller({ path: 'customers', version: '1' })
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getAll() {
    return this.customerService.getAll();
  }

  @Post()
  async create(@Body() body: CreateCustomerRequestDto) {
    return this.customerService.create(body);
  }

  @Get(':customerId')
  async getById(@Param() param: CustomerIdRequestDto) {
    return this.customerService.getById(param);
  }

  @Put(':customerId')
  async update(
    @Param() param: CustomerIdRequestDto,
    @Body() body: UpdateCustomerRequestDto
  ) {
    return this.customerService.update({ ...param, ...body });
  }

  @Delete(':customerId')
  async delete(@Param() param: CustomerIdRequestDto) {
    return this.customerService.delete(param);
  }
}
