import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { CreateTaskStatusDto } from './dto/create-task-status.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { BasicController } from 'src/controllers/basic.controller';
import { TaskStatusValidator } from 'src/validators/task-status.validator';

@Controller('task-statuses')
export class TaskStatusesController extends BasicController<CreateTaskStatusDto, UpdateTaskStatusDto> {
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
  findAll() {
    return this.taskStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    return this.taskStatusesService.update(+id, updateTaskStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskStatusesService.remove(+id);
  }
}
