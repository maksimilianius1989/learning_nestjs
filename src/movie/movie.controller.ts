import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/movie.dto';
import { ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MovieResponse } from './dto/movie-response.dto';

@ApiTags('Movie')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieSerivce: MovieService) { }

  @ApiOperation({
    summary: 'Отримати список фільмів',
    description: 'Повертає список з всіма фільмами',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Фільми знайдені', type: [MovieResponse]})
  @Get()
  async findAll() {
    return this.movieSerivce.findAll();
  }

  @ApiOperation({
    summary: 'Отримати фільми по ID',
    description: 'Повертає знайдений фільм',
  })
  @ApiParam({ name: 'id', type: 'string', description: 'Ідентифікатор фільму' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Фільм знайдений', type: MovieResponse })
  @ApiNotFoundResponse({
    description: 'Фільм не знайдений',
    example: {
      status: '404',
      message: 'Movie not found',
      time: new Date().toISOString(),
      path: 'movies/123'
    }
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.movieSerivce.findById(id);
  }

  @ApiOperation({ summary: 'Створити фільм' })
  @Post()
  async create(@Body() dto: MovieDto) {
    return this.movieSerivce.create(dto);
  }

  @Put(':id')
  async updagte(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieSerivce.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.movieSerivce.delete(id);
  }
} 
