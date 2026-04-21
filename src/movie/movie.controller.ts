import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieSerivce: MovieService) { }

  @Get()
  async findAll() {
    return this.movieSerivce.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.movieSerivce.findById(+id);
  }

  @Post()
  async create(@Body() dto: MovieDto) {
    return this.movieSerivce.create(dto);
  }

  @Put(':id')
  async updagte(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieSerivce.update(+id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.movieSerivce.delete(+id);
  }
}
