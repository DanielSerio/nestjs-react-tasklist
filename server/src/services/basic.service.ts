import { ListSortingReturn, ParsedQueryFilter, QueryFilterOperator, RawQueryFilter } from "#types/query.types";
import { TaskCategoryRecord, TaskStatusRecord } from "#types/task.types";
import { DataSource, EntityTarget, FindOptionsWhere, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, ObjectLiteral, Repository } from "typeorm";
import { z } from "zod";

export abstract class BasicService
  <
    Entity extends ObjectLiteral,
    Create extends Partial<Entity>,
    Update extends Partial<Entity>
  > {
  protected get repo(): Repository<Entity> {
    return this.dataSource.getRepository(this.model);
  }

  constructor(
    private model: EntityTarget<Entity>,
    protected dataSource: DataSource
  ) { }

  /**
   * Returns a `FindOptionsWhere` object based on the input criteria.
   * @param {number | FindOptionsWhere<Entity>} criteria - The `criteria` for the search. `number` | `FindOptionsWhere<Entity>`
   * .
   * @returns `FindOptionsWhere<Entity>`
   */
  private getWhereFromCriteria(criteria: number | FindOptionsWhere<Entity>): FindOptionsWhere<Entity> {
    let where = {};

    if (typeof criteria === 'number') {
      where = {
        id: criteria
      };
    } else {
      where = criteria;
    }

    return where;
  }

  create(create: Create) {
    return this.repo.insert({
      ...create
    });
  }

  async findAll(params?: Parameters<typeof this.repo.find>[0]) {
    const count = await this.repo.count(params?.where ? { where: params.where } : undefined);
    const take = (params?.take ?? 25);
    const skip = params?.skip ?? 0;
    const pages = Math.ceil(count / take);

    return {
      records: await this.repo.find({
        where: params?.where,
        take,
        skip,
        order: params?.order,
      }),
      limit: take,
      offset: skip,
      select: params?.select ?? '*',
      filter: null as null | ParsedQueryFilter<TaskStatusRecord | TaskCategoryRecord>[], //<-- Set before controller returns
      sort: null as null | ListSortingReturn<TaskStatusRecord | TaskCategoryRecord>, // <-- Set before controller returns
      search: null as null | string, // <-- Set before controller returns
      totals: {
        records: count,
        pages
      }
    };
  }

  findOne(criteria: number | FindOptionsWhere<Entity>) {
    const where = this.getWhereFromCriteria(criteria);

    return this.repo.findOne({
      where
    });
  }

  update(criteria: number | FindOptionsWhere<Entity>, update: Update) {
    const where = this.getWhereFromCriteria(criteria);

    return this.repo.update(where, update);
  }

  remove(criteria: number | FindOptionsWhere<Entity>) {
    const where = this.getWhereFromCriteria(criteria);

    return this.repo.softDelete(where);
  }
}