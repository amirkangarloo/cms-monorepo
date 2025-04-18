import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CustomerIdRequestDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    customerId: string;
}