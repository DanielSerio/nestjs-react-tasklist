import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DataSource, IsNull, Not } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskHelpers } from './task.helpers';
import { groupBy } from '../utilities';

@Injectable()
export class TasksService {
  private get repo() {
    return this.dataSource.getRepository(Task);
  }

  constructor(private dataSource: DataSource) { }

  private sortTasks(tasks: Task[]) {
    tasks.sort((a, b) => {
      if (a.priority && b.priority) {
        return b.priority - a.priority;
      }

      if (a.priority === null) {
        return tasks.length;
      }

      if (b.priority === null) {
        return -tasks.length;
      }

      return 0;
    });

    return tasks;
  }

  private groupByStatus(tasks: Task[]) {
    const sortedTasks = this.sortTasks(tasks);
    const groupByStatusId = (task) => task.statusId;

    return groupBy(sortedTasks, groupByStatusId);
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();

    Object.assign(task, createTaskDto);

    task.statusId = 1;

    return await this.repo.save(task);
  }

  async findAll(mock?: number) {
    if (mock) {
      return this.groupByStatus(TaskHelpers.createMockTasks(mock));
    }

    const found = await this.repo.find({
      where: {
        deletedAt: IsNull()
      }
    });

    return this.groupByStatus(found);
  }

  findOne(id: number, options?: { deleted?: boolean; }) {
    return this.repo.findOne({
      where: {
        id,
        deletedAt: options?.deleted === true ? Not(IsNull()) : IsNull()
      },
      withDeleted: true
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    Object.assign(found, updateTaskDto);

    return await this.repo.save(found);
  }

  async remove(id: number) {
    const found = await this.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return this.repo.softDelete(found.id);
  }

  async restore(id: number) {
    const found = await this.findOne(id, { deleted: true });

    if (!found) {
      throw new NotFoundException();
    }

    return this.repo.restore(id);
  }

  async restoreAll() {
    const deleted = await this.repo.find({
      select: [
        'id'
      ],
      where: {
        deletedAt: Not(IsNull())
      },
      withDeleted: true
    });

    const ids = deleted.map(({ id }) => id);

    if (ids && ids.length) {
      return await this.repo.restore(ids);
    }

    return null;
  }

  async flushDeletedCache() {
    const allDeletedTasks = await this.repo.find({
      where: {
        deletedAt: Not(IsNull())
      },
      withDeleted: true
    });

    const deletedIds = allDeletedTasks.map((task) => task.id);

    return await this.repo.delete(deletedIds);
  }
}
