import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './entities/task-status.entity';
import { BasicService } from '#services/basic.service';

@Injectable()
export class TaskStatusesService extends BasicService<TaskStatus, CreateTaskStatusDto, UpdateTaskStatusDto> {
  constructor(dataSource: DataSource) {
    super(TaskStatus, dataSource);
  }
}
