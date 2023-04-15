import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksProvider } from './tasks.provider';

@Module({
  controllers: [TasksController],
  providers: [TasksProvider],
})
export class TasksModule {}
