import { TransactionStatus } from '@prisma/client';

export class VerifyResponseDto {
  status: TransactionStatus;
  transactionId: string;
}
