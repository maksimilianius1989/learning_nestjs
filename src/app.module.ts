import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppTestService } from './app.testService';

@Module({ 
  controllers: [AppController],
  providers: [AppService, AppTestService],
})
export class AppModule {}
