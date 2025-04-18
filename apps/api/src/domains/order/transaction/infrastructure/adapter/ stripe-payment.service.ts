import { Injectable } from '@nestjs/common';
import {
  PayRequestDto,
  PayResponseDto,
  TransactionIdRequestDto,
  VerifyResponseDto,
} from 'apps/api/src/domains/order/transaction/application/dto';
import { IPaymentGateway } from 'apps/api/src/domains/order/transaction/domain/interface';

@Injectable()
export class StripePaymentService implements IPaymentGateway {
  async pay(payload: PayRequestDto): Promise<PayResponseDto> {
    // TODO: Implement the logic to create a payment using Stripe
    // This is a mock implementation.

    return { paymentUrl: 'https://stripe.com/payment' };
  }
  async verify(payload: TransactionIdRequestDto): Promise<VerifyResponseDto> {
    // TODO: Implement the logic to verify the payment using Stripe
    // This is a mock implementation.

    return { status: 'SUCCESS', transactionId: payload.transactionId };
  }
}
