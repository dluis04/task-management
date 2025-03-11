import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {

    constructor(
        @Inject('TasksRepository')
        private tasksRepository: TasksRepository,
      ) {}
    
    private tasks: Task[] = [];

    getAllTask(): Task[] {
        return this.tasks;
    }

    async getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksRepository.getTasks(filterDto);
    }

    async getTaskById(id: string): Promise<Task> {

        const task = await this.tasksRepository.findOneById(id);

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }

    async deleteTaskById(id: string): Promise<void> {
        const result = await this.tasksRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }

    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {

        const task = await this.getTaskById(id);
        task.status = status;
        await this.tasksRepository.save(task);
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksRepository.createTask(createTaskDto);
    }

}
