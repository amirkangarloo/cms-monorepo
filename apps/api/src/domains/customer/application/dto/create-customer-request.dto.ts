import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerRequestDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    address: string;
}