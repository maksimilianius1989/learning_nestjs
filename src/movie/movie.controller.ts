import { Body, Controller, Get, Post, Query, Headers, Req, Res, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import type { Response, Request } from 'express';

@Controller({
  path: 'movies'
})
export class MovieController {

  @Get()
  findAll(@Query() queries: string) {
    return queries;
  }

  @Get(':id/name/:name')
  findById(@Param('id') id: number, @Param('name') name: string) {
    return {id, name};
  }

  @Post()
  create(@Body() body: {title: string, genre: string}) {
    return body;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') userAgent: string) {
    return {userAgent};
  }

  @Get('request')
  getRequest(@Req() request: Request) {
    return {
      body: request.body,
      header: request.headers,
      method: request.method
    };
  }

  @Get('response')
  getResponse(@Res() response: Response) {
    return response.status(202).json({message: "hello"});
  }
} 
