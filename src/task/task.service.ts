import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
    private tasks = [
        {
            id: 1,
            title: "Learn NestJS",
            isCompleated: false,
        },
        {
            id: 2,
            title: "Build API",
            isCompleated: true,
        },
    ];

    findAll() {
        return this.tasks;
    }

    findById(id: Number) {
        const task = this.tasks.find(task => task.id === id);

        if (!task) {
            throw new NotFoundException('Taks is not exist!');
        }

        return task;
    }


    create(dto: CreateTaskDto) {
        const newTask = {
            id: this.tasks.length + 1,
            title: dto.title,
            isCompleated: false
        }

        this.tasks.push(newTask);

        return this.tasks; 
  }
}
