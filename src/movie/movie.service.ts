import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieDto as MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>
    ) { }

    async findAll(): Promise<MovieEntity[]> {
        return await this.movieRepository.find({
            where: {
                // isPublic: true
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async findById(id: number): Promise<MovieEntity> {
        const movie = await this.movieRepository.findOne({
            where: {
                id
            }
        });

        if (!movie) throw new NotFoundException("Movie not found");

        return movie;
    }

    async create(dto: MovieDto): Promise<MovieEntity> {
        const movie = this.movieRepository.create(dto);

        return await this.movieRepository.save(movie);
    }

    async update(id: number, dto: MovieDto): Promise<boolean> {
        const movie = await this.findById(id);

        Object.assign(movie, dto);

        await this.movieRepository.save(movie);

        return true;
    }
} 
