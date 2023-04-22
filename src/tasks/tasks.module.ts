import { Module } from '@nestjs/common';

import { TypeOrmExModule } from '../database/typeorm-ex.module';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './tasks.repository';
import { TasksProvider } from './tasks.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksProvider],
})
export class TasksModule {}
