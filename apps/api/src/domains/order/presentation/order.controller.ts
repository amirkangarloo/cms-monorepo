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
  CreateOrderRequestDto,
  OrderIdRequestDto,
  UpdateOrderRequestDto,
} from 'apps/api/src/domains/order/application/dto';
import { OrderService } from 'apps/api/src/domains/order/presentation/order.service';

@Controller({ path: 'order', version: '1' })
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll() {
    return this.orderService.getAll();
  }

  @Post()
  async create(@Body() body: CreateOrderRequestDto) {
    return this.orderService.create(body);
  }

  @Get(':orderId')
  async getById(@Param() param: OrderIdRequestDto) {
    return this.orderService.getById(param);
  }

  @Put(':orderId')
  async update(
    @Param() param: OrderIdRequestDto,
    @Body() body: UpdateOrderRequestDto
  ) {
    return this.orderService.update({ ...param, ...body });
  }

  @Delete(':orderId')
  async delete(@Param() param: OrderIdRequestDto) {
    return this.orderService.delete(param);
  }
}
