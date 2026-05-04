import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAget } from './common/decorators/user-agent.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post()
  create(@Body('title') title: string) {
    return `Movie: ${title}`;
  }

  @UseGuards(AuthGuard)
  @Get('@me')
  getProfile(@UserAget() userAget: string) {
    return {
      name: 'John Doe',
      email: 'test@test.com',
      userAget,
    };
  }
}
