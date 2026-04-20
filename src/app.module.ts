import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppTestService } from './app.testService';
import { MovieModule } from './movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({ 
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'root',
    password: '123456',
    database: 'nodejscourse',
    autoLoadEntities: true, 
    synchronize: true 
  }), MovieModule], 
  controllers: [AppController],
  providers: [AppService, AppTestService],
})
export class AppModule {}
  