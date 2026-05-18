import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash, verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import type { Request, Response } from 'express';
import { isDev } from 'src/utils/is-dev.utils';
import { jwtPayload } from './interfaces/jwt.interface';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configSrervice: ConfigService,
    private readonly jwtSeervice: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configSrervice.getOrThrow<string>('JWT_ACCESS_TOKEN_TTL');
    this.JWT_REFRESH_TOKEN_TTL = configSrervice.getOrThrow<string>('JWT_REFRESH_TOKEN_TTL');
    this.COOKIE_DOMAIN = configSrervice.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(res: Response, input: RegisterInput) {
    const { name, email, password } = input;
 
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

    return this.auth(res, user.id);
  }

  async login(res: Response, dto: LoginInput) {
    const { email, password } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });

    if (!user) throw new NotFoundException('Користувач не знайдений');

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) throw new NotFoundException('Користувач не знайдений');

    return this.auth(res, user.id);
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) throw new UnauthorizedException('Не дійсний refresh-токен');

    const payload = await this.jwtSeervice.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({ where: { id: payload.id }, select: { id: true } });

      if (!user) throw new NotFoundException('Користувач не знайдений');

      return this.auth(res, user.id);
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));

    return true;
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('Користувач не знайдений');

    return user;
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(res, refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));

    return { accessToken };
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

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configSrervice),
      // sameSite: isDev(this.configSrervice) ? 'none' : 'lax',
      sameSite: 'lax',
    });
  }
}