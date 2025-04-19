import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import {
  LoginRequestDto,
  LoginResponseDto,
} from 'apps/api/src/domains/auth/application/dto';
import { GetUserByEmailQuery } from 'apps/api/src/domains/auth/application/queries/get-user-by-email.query';
import { comparePassword } from 'apps/api/src/utils/utilities';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async login(payload: LoginRequestDto) {
    const { email, password } = payload;
    const user = await this.commandBus.execute(new GetUserByEmailQuery(email));
    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    return this.jwtAccessTokenGenerate({
      sub: user.id,
      name: user.name,
    });
  }

  private async jwtAccessTokenGenerate(payload: {
    sub: string;
    name: string;
  }): Promise<LoginResponseDto> {
    return { jwtToken: await this.jwtService.signAsync(payload) };
  }
}
