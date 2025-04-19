import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserCommand } from 'apps/api/src/domains/auth/application/commands/create-user.command';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from 'apps/api/src/domains/auth/application/dto';
import { GetUserByEmailQuery } from 'apps/api/src/domains/auth/application/queries/get-user-by-email.query';
import { comparePassword, hashPassword } from 'apps/api/src/utils/utilities';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async login(payload: LoginRequestDto) {
    const { email, password } = payload;
    const user = await this.queryBus.execute(new GetUserByEmailQuery(email));
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

  async register(payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    const { password: plainPassword, email, name } = payload;
    await this.checkEmailIsUnique(email);
    const password = await hashPassword(plainPassword);

    await this.commandBus.execute(new CreateUserCommand(name, email, password));

    return { message: 'User registered successfully' };
  }

  private async checkEmailIsUnique(email: string): Promise<void> {
    const exist = await this.queryBus.execute(new GetUserByEmailQuery(email));
    if (exist) {
      throw new ConflictException(
        'Email already exists, please try another one'
      );
    }
  }

  private async jwtAccessTokenGenerate(payload: {
    sub: string;
    name: string;
  }): Promise<LoginResponseDto> {
    return { jwtToken: await this.jwtService.signAsync(payload) };
  }
}
