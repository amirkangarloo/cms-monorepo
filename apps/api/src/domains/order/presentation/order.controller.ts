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

@Controller({ path: 'orders', version: '1' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  @Post()
  async create(@Body() body: CreateCustomerRequestDto) {
    return this.orderService.create(body);
  }

  @Get(':customerId')
  async getById(@Param() param: CustomerIdRequestDto) {
    return this.orderService.getById(param);
  }

  @Put(':customerId')
  async update(
    @Param() param: CustomerIdRequestDto,
    @Body() body: UpdateCustomerRequestDto
  ) {
    return this.orderService.update({ ...param, ...body });
  }

  @Delete(':customerId')
  async delete(@Param() param: CustomerIdRequestDto) {
    return this.orderService.delete(param);
  }
}
