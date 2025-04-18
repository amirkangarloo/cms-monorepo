import { Injectable } from '@nestjs/common';
import { DbService } from 'apps/api/src/db/db.service';
import { Transaction as PrismaTransaction } from '@prisma/client';
import { Transaction } from 'apps/api/src/domains/order/transaction/domain/transaction.entity';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: DbService) {}

  async create(transaction: Partial<Transaction>): Promise<Transaction> {
    const t = await this.prisma.transaction.create({
      data: {
        amount: transaction.amount,
        paymentGateway: transaction.paymentGateway,
        order: {
          connect: {
            id: transaction.orderId,
          },
        },
      },
    });

    return this.mapToEntity(t);
  }

  async findById(id: string): Promise<Transaction | null> {
    const t = await this.prisma.transaction.findUnique({
      where: { id },
    });

    return t ? this.mapToEntity(t) : null;
  }

  async update(
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction> {
    const t = await this.prisma.transaction.update({
      where: { id },
      data: transaction,
    });

    return this.mapToEntity(t);
  }

  private mapToEntity(transaction: PrismaTransaction): Transaction {
    return new Transaction(
      transaction.id,
      Number(transaction.amount),
      transaction.status,
      transaction.paymentGateway,
      transaction.orderId,
      transaction.createdAt,
      transaction.updatedAt
    );
  }
}
