import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppTestService } from './app.testService';
import { TaskModule } from './task/task.module';

@Module({ 
  controllers: [AppController],
  providers: [AppService, AppTestService],
  imports: [TaskModule],
})
export class AppModule {}
