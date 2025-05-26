import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Req } from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { BasicController } from 'src/controllers/basic.controller';
import { TaskStatusValidator } from 'src/validators/task-status.validator';
import { TaskStatusRecord } from '#types/task.types';
import { Request } from 'express';

@Controller('task-statuses')
export class TaskStatusesController extends BasicController<CreateTaskStatusDto, UpdateTaskStatusDto, TaskStatusRecord> {
  constructor(private readonly taskStatusesService: TaskStatusesService) {
    super({
      createValidator: TaskStatusValidator.forCreate,
      updateValidator: TaskStatusValidator.forUpdate
    });
  }

  @Post()
  create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    try {
      const valid = this.validateCreate(createTaskStatusDto);

      return this.taskStatusesService.create(valid);
    } catch (err) {
      this.handleError(err);
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    const [params, filters, search] = this.extractListParamsFromURL(req.url);
    const result = await this.taskStatusesService.findAll(params);

    if (filters && filters.length > 0) {
      result.filter = filters;
    }

    if (search && search.length > 0) {
      result.search = search;
    }

    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!this.isValidID(id)) {
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    return this.taskStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    try {
      const valid = this.validateUpdate(updateTaskStatusDto);

      return this.taskStatusesService.update(+id, valid);
    } catch (err) {
      this.handleError(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidID(id)) {
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    return this.taskStatusesService.remove(+id);
  }
}
