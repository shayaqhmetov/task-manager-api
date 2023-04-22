import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { TasksProvider } from './tasks.provider';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksProvider: TasksProvider) {}

  @Get()
  public getTasks(
    @Query() getTasksFilterDto: GetTaskFilterDto,
  ): Promise<Task[]> {
    return this.tasksProvider.getTasks(getTasksFilterDto);
  }

  @Post('')
  public createTask(@Body() taskCreateDto: CreateTaskDto): Promise<Task> {
    return this.tasksProvider.createTask(taskCreateDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksProvider.getTaskById(id);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Promise<void> {
    this.tasksProvider.deleteTaskById(id);
    return;
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() correctTaskStatusDto: UpdateTaskDto,
  ): Promise<Task> {
    const { status } = correctTaskStatusDto;
    return this.tasksProvider.updateTaskStatus(id, status);
  }
}
