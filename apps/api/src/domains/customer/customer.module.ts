import { Module, Provider } from "@nestjs/common";
import * as queryHandler from "apps/api/src/domains/customer/application/queries";
import * as commandHandler from "apps/api/src/domains/customer/application/commands";
import { CustomerController } from "apps/api/src/domains/customer/presentation/customer.controller";
import { CustomerService } from "apps/api/src/domains/customer/presentation/customer.service";
import { CustomerRepository } from "apps/api/src/domains/customer/infrastructure/customer.repository";

const queryHandlers: Provider[] = Object.values(queryHandler);
const commandHandlers: Provider[] = Object.values(commandHandler);

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CustomerService, CustomerRepository, ...commandHandlers, ...queryHandlers],
    exports: [],
})
export class CustomerModule { }