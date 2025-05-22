import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { TaskCategory } from './entities/task-category.entity';
import { BasicService } from '#services/basic.service';

@Injectable()
export class TaskCategoriesService extends BasicService<TaskCategory, CreateTaskCategoryDto, UpdateTaskCategoryDto> {
  constructor(dataSource: DataSource) {
    super(TaskCategory, dataSource);
  }
}
