import {
  PayRequestDto,
  PayResponseDto,
  TransactionIdRequestDto,
  VerifyResponseDto,
} from 'apps/api/src/domains/order/transaction/application/dto';

export interface IPaymentGateway {
  pay(payload: PayRequestDto): Promise<PayResponseDto>;
  verify(payload: TransactionIdRequestDto): Promise<VerifyResponseDto>;
}
