import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequest } from './dto/register.dto';
import { LoginRequest } from './dto/login.dto';
import type { Request, Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResponse } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Створення акаунта',
    description: 'Створення нового акаунта для користувача.',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Не коректні вхідні дані' })
  @ApiConflictResponse({ description: 'Користувач з такою почтою вже існує' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res({ passthrough: true }) res: Response, @Body() dto: RegisterRequest) {
    return await this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Вхід в систему',
    description: 'Авторизує користувача та видає токен доступу.',
  })
  @ApiOkResponse({ type: AuthResponse })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Не коректні вхідні дані' })
  @ApiNotFoundResponse({ description: 'Користувач не знайдений' })
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginRequest) {
    return await this.authService.login(res, dto);
  }

  @ApiOkResponse({ type: AuthResponse })
  @HttpCode(HttpStatus.OK)
  @ApiUnauthorizedResponse({ description: 'Не дійсний refresh-токен' })
  @ApiNotFoundResponse({ description: 'Користувач не знайдений' })
  @ApiOperation({
    summary: 'Оновлення токену',
    description: 'Генерує новий токен доступу',
  })
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return await this.authService.refresh(req, res);
  }

  @ApiOperation({
    summary: 'Вихід з системи',
  })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('@me')
  @HttpCode(HttpStatus.OK)
  async me(@Req() req: Request) {
    return req.user;
  }
}
