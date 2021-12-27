import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  validateUser(userId: string) {
    return this.prisma.user.findUnique({ where: { userId: userId } });
  }

  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    const passwordValid = user.password === password;

    if (!passwordValid) throw new UnauthorizedException('Invalid password');

    return {
      accessToken: this.jwt.sign({ userId: user.userId }),
    };
  }
}
