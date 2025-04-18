import { PaymentGateway } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionRequestDto {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(PaymentGateway)
  @IsNotEmpty()
  paymentGateway: PaymentGateway;

  @IsString()
  @IsUUID()
  @IsNotEmpty()
  orderId: string;
}
