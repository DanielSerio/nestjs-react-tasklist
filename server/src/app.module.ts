import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskCategoriesModule } from './task-categories/task-categories.module';
import { TaskStatusesModule } from './task-statuses/task-statuses.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from './task-statuses/entities/task-status.entity';
import { TaskCategory } from './task-categories/entities/task-category.entity';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './tasklist',
      entities: [
        TaskStatus,
        TaskCategory,
        Task
      ],
      synchronize: true,
    }),
    TaskCategoriesModule, TaskStatusesModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
