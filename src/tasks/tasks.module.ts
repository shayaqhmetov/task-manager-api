import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksProvider } from './tasks.provider';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksProvider],
})
export class TasksModule {}
