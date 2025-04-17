import { Module } from "@nestjs/common";
import { CreateCustomerHandler } from "apps/api/src/domains/customer/application/commands/create-customer.handler";
import { GetCustomersHandler } from "apps/api/src/domains/customer/application/queries/get-customers.handler";
import { CustomerController } from "apps/api/src/domains/customer/customer.controller";
import { CustomerService } from "apps/api/src/domains/customer/customer.service";
import { CustomerRepository } from "apps/api/src/domains/customer/infrastructure/customer.repository";

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository, CreateCustomerHandler, GetCustomersHandler],
    exports: [],
})
export class CustomerModule { }