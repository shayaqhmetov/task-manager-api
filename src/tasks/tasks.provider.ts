import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksProvider {
  private tasks: Task[] = [];

  /**
   * Get all tasks
   * @returns {Task[]}
   */
  public getAllTasks() {
    return this.tasks;
  }

  /**
   * Get tasks with filters
   * @param getTasksFilterDto {GetTaskFilterDto}
   * @returns {Task[]}
   */
  public getTasksWithFilters(getTasksFilterDto: GetTaskFilterDto) {
    const { status, search } = getTasksFilterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      const searchText = search.toLowerCase();
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchText) ||
          task.description.toLowerCase().includes(searchText),
      );
    }
    return tasks;
  }

  /**
   * Create a new task
   * @param title
   * @param description
   * @returns {Task}
   */
  public createTask(taskCreateDto: CreateTaskDto) {
    const { title, description } = taskCreateDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  /**
   * Get a task by id
   * @param id
   * @returns {Task}
   */
  public getTaskById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * Delete a task by id
   * @param id
   * @returns {Task}
   */
  public deleteTaskById(id: string) {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return task;
  }

  /**
   * Update a task status by id
   * @param id
   * @param status
   * @returns {Task}
   */
  public updateTaskStatus(id: string, status: TaskStatus) {
    if (TaskStatus[status] === undefined) {
      throw new Error('Invalid status');
    }
    const task = this.getTaskById(id);
    task.status = status;
    this.tasks = this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    return task;
  }
}
