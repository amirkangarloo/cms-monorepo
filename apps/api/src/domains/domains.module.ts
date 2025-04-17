import { Module } from "@nestjs/common";
import { CustomerModule } from "apps/api/src/domains/customer/customer.module";

@Module({
    imports: [CustomerModule],
})
export class DomainsModule { }