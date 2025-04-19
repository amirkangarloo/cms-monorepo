import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginRequestDto,
  LoginResponseDto,
} from 'apps/api/src/domains/auth/application/dto';
import { AuthService } from 'apps/api/src/domains/auth/presentation/auth.service';
import { Public } from 'apps/api/src/utils/decorator';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }
}
