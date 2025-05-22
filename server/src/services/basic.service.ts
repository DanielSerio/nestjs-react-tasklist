import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export abstract class BasicService<Entity extends ObjectLiteral, Create, Update> {
  protected get repo(): Repository<Entity> {
    return this.dataSource.getRepository(this.model);
  }

  constructor(private model: EntityTarget<Entity>, protected dataSource: DataSource) { }


  create(createTaskCategoryDto: Create) {
    return 'This action adds a new taskCategory';
  }

  findAll() {
    return `This action returns all taskCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskCategory`;
  }

  update(id: number, updateTaskCategoryDto: Update) {
    return `This action updates a #${id} taskCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskCategory`;
  }
}