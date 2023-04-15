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

import { TasksProvider } from './tasks.provider';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksProvider: TasksProvider) {}

  @Get()
  public getTasks(@Query() getTasksFilterDto: GetTaskFilterDto): Task[] {
    if (Object.keys(getTasksFilterDto).length) {
      return this.tasksProvider.getTasksWithFilters(getTasksFilterDto);
    }
    return this.tasksProvider.getAllTasks();
  }

  @Post('')
  public createTask(@Body() taskCreateDto: CreateTaskDto): Task {
    return this.tasksProvider.createTask(taskCreateDto);
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string): Task {
    return this.tasksProvider.getTaskById(id);
  }

  @Delete('/:id')
  public deleteTaskById(@Param('id') id: string): Task {
    return this.tasksProvider.deleteTaskById(id);
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksProvider.updateTaskStatus(id, status);
  }
}
