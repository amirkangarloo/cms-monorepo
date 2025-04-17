import { Injectable } from '@nestjs/common';
import { DbService } from 'apps/api/src/db/db.service';
import { Customer as PrismaCustomer } from '@prisma/client';
import { Customer } from 'apps/api/src/domains/customer/domain/customer.entity';

@Injectable()
export class CustomerRepository {
    constructor(private readonly prisma: DbService) { }

    async findAll(): Promise<Customer[]> {
        const customers = await this.prisma.customer.findMany();
        return customers.map(c => this.mapToEntity(c));
    }

    async findById(id: string): Promise<Customer | null> {
        const c = await this.prisma.customer.findUnique({ where: { id } });
        return c ? this.mapToEntity(c) : null;
    }

    async create(customer: Partial<Customer>): Promise<Customer> {
        const c = await this.prisma.customer.create({ data: { address: customer.address, email: customer.email, name: customer.name } });
        return this.mapToEntity(c);
    }

    async update(id: string, customer: Partial<Customer>): Promise<Customer> {
        const c = await this.prisma.customer.update({ where: { id }, data: customer });
        return this.mapToEntity(c);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.customer.delete({ where: { id } });
    }

    private mapToEntity(customer: PrismaCustomer): Customer {
        return new Customer(customer.id, customer.name, customer.email, customer.address, customer.createdAt, customer.updatedAt);
    }
}
