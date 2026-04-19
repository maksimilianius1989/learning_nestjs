import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
            throw new NotFoundException('Task is not exist!');
        }

        return task;
    }


    create(dto: CreateTaskDto) {
        const {title, description, priority} = dto;
        const newTask = {
            id: this.tasks.length + 1,
            title,
            description,
            priority,
            isCompleated: false
        }

        this.tasks.push(newTask);
 
        return this.tasks;
    }

    update(id: number, dto: UpdateTaskDto) {
        const { title, isCompleated } = dto;
        const task = this.findById(id);

        task.title = dto.title;
        task.isCompleated = dto.isCompleated;

        return task;
    }

    patchUpdate(id: Number, dto: Partial<UpdateTaskDto>) {
        const task = this.findById(id);

        Object.assign(task, dto);

        return task;
    }

    delete(id: Number) {
        const task = this.findById(id);

        this.tasks = this.tasks.filter(task => task.id !== id);

        return task;
    }
}
