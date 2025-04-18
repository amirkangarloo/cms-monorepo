export class CreateOrderCommand {
  constructor(
    public readonly amount: number,
    public readonly customerId: string,
  ) {}
}
