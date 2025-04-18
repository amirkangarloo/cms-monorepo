import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionRequestDto } from 'apps/api/src/domains/order/transaction/application/dto';
import { TransactionService } from 'apps/api/src/domains/order/transaction/presentation/transaction.service';

@Controller({ path: 'transaction', version: '1' })
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  async create(@Body() body: CreateTransactionRequestDto) {
    return this.transactionService.create(body);
  }
}
