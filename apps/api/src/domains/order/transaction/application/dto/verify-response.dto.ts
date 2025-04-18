export class VerifyResponseDto {
  status: 'SUCCESS' | 'FAILED';
  transactionId: string;
}
