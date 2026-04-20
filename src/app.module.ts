import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppTestService } from './app.testService';
import { MovieModule } from './movie/movie.module';

@Module({ 
  controllers: [AppController],
  providers: [AppService, AppTestService],
  imports: [MovieModule],
})
export class AppModule {}
 