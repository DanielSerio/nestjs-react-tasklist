import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException, Req } from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { BasicController } from 'src/controllers/basic.controller';
import { TaskCategoryValidator } from 'src/validators/task-category.validator';
import { Request } from 'express';
import { TaskCategoryRecord } from '#types/task.types';

@Controller('task-categories')
export class TaskCategoriesController extends BasicController<CreateTaskCategoryDto, UpdateTaskCategoryDto, TaskCategoryRecord> {
  constructor(private readonly taskCategoriesService: TaskCategoriesService) {
    super({
      createValidator: TaskCategoryValidator.forCreate,
      updateValidator: TaskCategoryValidator.forUpdate
    });
  }

  @Post()
  create(@Body() createTaskCategoryDto: CreateTaskCategoryDto) {
    try {
      const valid = this.validateCreate(createTaskCategoryDto);

      return this.taskCategoriesService.create(valid);
    } catch (err) {
      this.handleError(err);
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    const [params, { columnFilters: filters, search }] = this.extractListParamsFromURL(req.url);

    const result = await this.taskCategoriesService.findAll(params);

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

    return this.taskCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    try {
      const valid = this.validateUpdate(updateTaskCategoryDto);

      return this.taskCategoriesService.update(+id, valid);
    } catch (err) {
      this.handleError(err);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!this.isValidID(id)) {
      throw new BadRequestException(`Invalid ID: ${id}`);
    }

    return this.taskCategoriesService.remove(+id);
  }
}
