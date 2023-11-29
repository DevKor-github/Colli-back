import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { CustomTypeOrmRepositoryModule } from 'src/config/customTypeOrmRepository';

@Module({
  imports: [CustomTypeOrmRepositoryModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
