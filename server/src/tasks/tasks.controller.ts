import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, Query, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskValidator } from 'src/validators/task.validator';
import { ZodError } from 'zod';

@Controller('tasks')
export class TasksController {

  constructor(private readonly tasksService: TasksService) { }

  private isZodError<T>(err: unknown): err is ZodError<T> {
    return typeof err == 'object' && err !== null && (err as any).issues !== undefined;
  }

  private handleError(err: unknown) {
    if (this.isZodError(err)) {
      return new BadRequestException(err);
    }

    return new InternalServerErrorException(err);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    try {
      const valid = TaskValidator.forCreate.parse(createTaskDto);

      return this.tasksService.create(valid);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  @Get()
  findAll(@Query('mock') mock: string) {
    try {
      if (mock) {
        if (mock === 'true') {
          return this.tasksService.findAll(12);
        } else if (!isNaN(+mock)) {
          return this.tasksService.findAll(+mock);
        }
      }

      return this.tasksService.findAll();
    } catch (err) {
      throw this.handleError(err);
    }
  }

  @Get('restore')
  restoreAll() {
    try {
      return this.tasksService.restoreAll();
    } catch (err) {
      throw this.handleError(err);
    }
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    try {
      const found = await this.tasksService.findOne(+id, { deleted: true });

      if (!found) {
        throw new NotFoundException();
      }

      return found;
    } catch (err) {
      throw this.handleError(err);
    }
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    try {
      const valid = TaskValidator.forUpdate.parse(updateTaskDto);

      return this.tasksService.update(+id, valid);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    try {
      return this.tasksService.remove(+id);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  @Get('restore/:id')
  restore(@Param('id') id: string) {
    try {
      return this.tasksService.restore(+id);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  @Delete('deleted')
  flushDeleted() {
    try {
      return this.tasksService.flushDeletedCache();
    } catch (err) {
      throw this.handleError(err);
    }
  }
}
