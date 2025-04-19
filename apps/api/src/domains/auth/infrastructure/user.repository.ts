import { Injectable } from '@nestjs/common';
import { DbService } from 'apps/api/src/db/db.service';
import { User as PrismaUser } from '@prisma/client';
import { User } from 'apps/api/src/domains/auth/domain/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: DbService) {}

  async findByEmail(email: string): Promise<User | null> {
    const u = await this.prisma.user.findUnique({ where: { email } });
    return u ? this.mapToEntity(u) : null;
  }

  private mapToEntity(user: PrismaUser): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }
}
