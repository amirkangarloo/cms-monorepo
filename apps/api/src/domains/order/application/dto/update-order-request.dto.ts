import { PartialType, PickType } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { CreateOrderRequestDto } from 'apps/api/src/domains/order/application/dto/create-order-request.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderRequestDto extends PartialType(
  PickType(CreateOrderRequestDto, ['amount'])
) {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
