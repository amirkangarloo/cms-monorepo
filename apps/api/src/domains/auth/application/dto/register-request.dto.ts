import { IntersectionType } from '@nestjs/swagger';
import { LoginRequestDto } from 'apps/api/src/domains/auth/application/dto/login-request.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequestDto extends IntersectionType(LoginRequestDto) {
  @IsString()
  @IsNotEmpty()
  name: string;
}
