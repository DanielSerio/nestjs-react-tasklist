import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { TaskCategoriesService } from './task-categories.service';
import { CreateTaskCategoryDto } from './dto/create-task-category.dto';
import { UpdateTaskCategoryDto } from './dto/update-task-category.dto';
import { BasicController } from 'src/controllers/basic.controller';
import { TaskCategoryValidator } from 'src/validators/task-category.validator';

@Controller('task-categories')
export class TaskCategoriesController extends BasicController<CreateTaskCategoryDto, UpdateTaskCategoryDto> {
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
  findAll() {
    return this.taskCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskCategoryDto: UpdateTaskCategoryDto) {
    return this.taskCategoriesService.update(+id, updateTaskCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCategoriesService.remove(+id);
  }
}
