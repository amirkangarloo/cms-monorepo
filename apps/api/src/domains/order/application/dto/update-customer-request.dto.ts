import { PartialType } from "@nestjs/swagger";
import { CreateCustomerRequestDto } from "apps/api/src/domains/customer/application/dto/create-customer-request.dto";

export class UpdateCustomerRequestDto extends PartialType(CreateCustomerRequestDto) { }