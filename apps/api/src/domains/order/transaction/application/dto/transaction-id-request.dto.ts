import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TransactionIdRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  transactionId: string;
}
