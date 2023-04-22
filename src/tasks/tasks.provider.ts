import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { Task } from './tasks.entity';
import { TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { ERROR_MESSAGE } from '../constants';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksProvider {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  public getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  /**
   * Create a new task
   * @param title
   * @param description
   * @returns {Task}
   */
  public createTask(taskCreateDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(taskCreateDto);
  }

  /**
   * Get a task by id
   * @param id
   * @returns {Promise<Task>}
   */
  public async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundException(ERROR_MESSAGE.TASK_NOT_FOUND(id));
    }
    return task;
  }

  /**
   * Delete a task by id
   * @param id
   * @returns {Task}
   */
  public async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(ERROR_MESSAGE.TASK_NOT_FOUND(id));
    }
  }

  /**
   * Update a task status by id
   * @param id
   * @param status
   * @returns {Task}
   */
  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.taskRepository.save(task);

    return task;
  }
}
