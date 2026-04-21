import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) { }

  @Post()
  async create(@Body() dto: CreateActorDto) {
    return await this.actorService.create(dto);
  }
} 
 