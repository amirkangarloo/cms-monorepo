import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCustomerRequestDto } from 'apps/api/src/domains/customer/application/dto';
import { CustomerService } from 'apps/api/src/domains/customer/customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    async getAll() {
        return this.customerService.getAll();
    }

    @Post()
    async create(@Body() body: CreateCustomerRequestDto) {
        return this.customerService.create(body);
    }

    // add GET/:id, PUT/:id, DELETE/:id similarly
}
