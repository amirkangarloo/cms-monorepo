import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class OrderIdRequestDto {
    @IsString()
    @IsUUID()
    @IsNotEmpty()
    orderId: string;
}