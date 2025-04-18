import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import {
  CreateTransactionRequestDto,
  TransactionIdRequestDto,
} from 'apps/api/src/domains/order/transaction/application/dto';
import { TransactionService } from 'apps/api/src/domains/order/transaction/presentation/transaction.service';

@Controller({ path: 'transaction', version: '1' })
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('pay')
  async pay(@Body() body: CreateTransactionRequestDto) {
    return this.transactionService.pay(body);
  }

  @Post('verify/:transactionId')
  async verify(@Param() param: TransactionIdRequestDto) {
    return this.transactionService.verify(param);
  }
}
