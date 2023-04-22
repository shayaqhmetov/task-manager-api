import { Repository } from 'typeorm';

import { Task } from './tasks.entity';
import { CustomRepository } from '../database/typeorm-ex.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './tasks.model';
import { User } from 'src/auth/entities/user.entity';

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTaskFilterDto, user: User) {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  /**
   * Create a new task
   * @param taskCreateDto {CreateTaskDto}
   * @returns {Task}
   */
  async createTask(taskCreateDto: CreateTaskDto, user: User) {
    const { title, description } = taskCreateDto;
    const task: Task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    return await this.save(task);
  }

  /**
   * Get task by id
   * @param id {number}
   * @returns {Task}
   */
  async getTaskById(id: string, user: User): Promise<Task> {
    return await this.findOne({
      where: { id, user },
    });
  }
}
