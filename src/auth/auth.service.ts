import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterRequest } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './interfaces/jwt.interface';
import ms from 'ms';
import { LoginRequest } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configSrervice: ConfigService,
    private readonly jwtSeervice: JwtService,
  ) {
    this.JWT_SECRET = configSrervice.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = configSrervice.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = configSrervice.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
  }

  async register(dto: RegisterRequest) {
    const { name, email, password } = dto;

    const existUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (existUser) throw new ConflictException('Користувач з такою почтою вже існує');

    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await hash(password),
      },
    });

    return this.generateTokens(user.id);
  }

  async login(dto: LoginRequest) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) throw new NotFoundException('Користувач не знайдений');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) throw new NotFoundException('Користувач не знайдений');

    return this.generateTokens(user.id);
  }

  private generateTokens(id: string) {
    const payload: jwtPayload = { id };

    const accessToken = this.jwtSeervice.sign(payload, { expiresIn: this.JWT_ACCESS_TOKEN_TTL as ms.StringValue });
    const refreshToken = this.jwtSeervice.sign(payload, { expiresIn: this.JWT_REFRESH_TOKEN_TTL as ms.StringValue });

    return {
      accessToken,
      refreshToken,
    };
  }
}
