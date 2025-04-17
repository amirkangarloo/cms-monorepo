export class Customer {
    constructor(
        public readonly id: string,
        public name: string,
        public email: string,
        public address: string,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) { }
}