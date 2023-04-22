import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TasksProvider } from './tasks.provider';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksProvider: TasksProvider) {}

  @Get()
  public getTasks(
    @Query() getTasksFilterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksProvider.getTasks(getTasksFilterDto, user);
  }

  @Post('')
  public createTask(
    @Body() taskCreateDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksProvider.createTask(taskCreateDto, user);
  }

  @Get('/:id')
  public getTaskById(@Param('id') id: string, @GetUser() user): Promise<Task> {
    return this.tasksProvider.getTaskById(id, user);
  }

  @Delete('/:id')
  public deleteTaskById(
    @Param('id') id: string,
    @GetUser() user,
  ): Promise<void> {
    this.tasksProvider.deleteTaskById(id, user);
    return;
  }

  @Patch('/:id/status')
  public updateTaskStatus(
    @Param('id') id: string,
    @Body() correctTaskStatusDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = correctTaskStatusDto;
    return this.tasksProvider.updateTaskStatus(id, status, user);
  }
}
