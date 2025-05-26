import { ParsedQueryFilter, RawQueryFilter } from "#types/query.types";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { FindManyOptions, FindOptionsOrder, FindOptionsWhere, In, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Or } from "typeorm";
import { z, ZodError, ZodSchema } from "zod";

export interface BasicControllerArgs<CreateDto, UpdateDto> {
  createValidator: ZodSchema<CreateDto>;
  updateValidator: ZodSchema<UpdateDto>;
}

export abstract class BasicController<CreateDto, UpdateDto, RecordType> {
  protected createValidator: ZodSchema<CreateDto>;
  protected updateValidator: ZodSchema<UpdateDto>;

  constructor({ createValidator, updateValidator }: BasicControllerArgs<CreateDto, UpdateDto>) {
    this.createValidator = createValidator;
    this.updateValidator = updateValidator;
  }

  private isZodError<T>(err: unknown): err is ZodError<T> {
    return typeof err == 'object' && err !== null && (err as any).issues !== undefined;
  }

  private getQueryInt(val: string | null, min: number = 0, defaultValue: number = 0) {
    if (val === null || isNaN(+val)) {
      return defaultValue;
    }

    const int = +val;

    if (int <= min) {
      return min;
    }

    return ~~val;
  }

  protected isValidID(idString: string): boolean {
    const int = +idString;

    if (!isNaN(int) && int % 1 === 0 || int > 0) {
      return true;
    }

    return false;
  }

  protected validateCreate(createDto: CreateDto) {
    return this.createValidator.parse(createDto);
  }

  protected validateUpdate(updateDto: UpdateDto) {
    return this.updateValidator.parse(updateDto);
  }

  protected handleError(err: unknown) {
    if (this.isZodError(err)) {
      throw new BadRequestException(err);
    }

    throw new InternalServerErrorException(err);
  }

  private processSorting(pSort: string | null) {
    if (pSort == null || pSort === 'null') {
      return null;
    }

    const decoded = decodeURIComponent(pSort ?? '');

    if (!decoded) {
      return null;
    }

    return JSON.parse(decoded).reduce(({ }, strVal) => {
      const [field, dir] = strVal.split(/[_]/g);
      return {
        [field]: (dir === 'asc' ? 'asc' : 'desc') as 'ASC' | "DESC"
      };
    }, {} satisfies FindOptionsOrder<RecordType>);
  }

  private extractColumnFilters(queryText: string): RawQueryFilter[] | null {
    const decoded = decodeURIComponent(queryText);

    if (!decoded) {
      return null;
    }

    // format of decoded will be a string in `column_operator_value` format
    const filterRegex = /(\w+)[_](ct|sw|ew|eq|ne|gt|gte|lt|lte|in|nin)[_](.+?)((?=[,|&])?)/g;
    const matches = decoded.match(filterRegex);

    if (!matches) {
      return null;
    }

    return [...matches].map((matchStr: string) => {
      const [id, operator, value] = matchStr.split(/[_]/g);

      return {
        id,
        operator,
        value
      } as RawQueryFilter;
    });
  }

  private parseColumnFilter<FilterValue>(filter: RawQueryFilter): null | ParsedQueryFilter<FilterValue> {
    const validator = z.object({
      id: z.string(),
      operator: z.enum(['ct', 'sw', 'ew', 'eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'in', 'nin']),
      value: z.any()
    });

    const parsed = validator.safeParse(filter);

    if (!parsed.success) {
      console.warn('Invalid filter format:', filter, parsed.error);

      return null;
    }

    return {
      id: parsed.data.id,
      operator: parsed.data.operator,
      value: parsed.data.value as FilterValue
    };
  }

  private getLike(code: 'sw' | 'ew' | 'ct', value: string) {
    let text = `%${value}%`;

    if (code === 'sw') {
      text = `${value}%`;
    }

    if (code === 'ew') {
      text = `%${value}`;
    }

    return Like(text);
  }

  private getComparisonOperator(code: 'gt' | 'gte' | 'lt' | 'lte', value: number | Date) {
    let intValue: number = 0;

    if (!['object', 'number'].includes(typeof value)) {
      throw new Error(`Invalid value type for comparison operator: ${typeof value}. Expected 'object' or 'number'.`);
    }

    if (typeof value === 'object' && value instanceof Date) {
      intValue = value.getTime();
    }

    if (typeof value === 'number') {
      intValue = value;
    }

    switch (code) {
      case 'gt':
        return MoreThan(intValue);
      case 'gte':
        return MoreThanOrEqual(intValue);
      case 'lt':
        return LessThan(intValue);
      case 'lte':
        return LessThanOrEqual(intValue);
      default:
        throw new Error(`Invalid comparison operator code: ${code}. Expected 'gt', 'gte', 'lt', or 'lte'.`);
    }
  }

  private translateColumnFilter<T>(filter: ParsedQueryFilter<T>, where: FindOptionsWhere<RecordType> = {}): FindOptionsWhere<RecordType> {
    switch (filter.operator) {
      case 'sw':
      case 'ew':
        return {
          ...where,
          [filter.id]: this.getLike(filter.operator, `${filter.value}`)
        };
      case 'eq':
        return {
          ...where,
          [filter.id]: filter.value
        };
      case 'ne':
        return {
          ...where,
          [filter.id]: Not(filter.value)
        };
      case 'gt':
      case 'gte':
      case 'lt':
      case 'lte':
        return {
          ...where,
          [filter.id]: this.getComparisonOperator(filter.operator, filter.value as number | Date)
        };
      case 'in':
        return {
          ...where,
          [filter.id]: In(Array.isArray(filter.value) ? filter.value : [filter.value])
        };
      case 'nin':
        return {
          ...where,
          [filter.id]: Not(In(Array.isArray(filter.value) ? filter.value : [filter.value]))
        };
      // default case should just search for the text value  
      case 'ct':
      default:
        return {
          ...where,
          [filter.id]: this.getLike('ct', `${filter.value}`)
        };
    }
  }

  /**
   * Parses and translates column filters from a query text into a FindOptionsWhere object.
   * @param {string} queryText - The `queryText` parameter in the `parseColumnFilters` function is a
   * string that contains the filters for columns that need to be parsed and processed.
   * @returns `FindOptionsWhere<RecordType>`
   */
  public parseColumnFilters(queryText: string) {
    if (queryText == null || queryText === 'null') {
      return null; // No filters provided
    }

    const rawFilters = this.extractColumnFilters(queryText);

    console.debug('Extracted raw filters:', rawFilters);

    if (!rawFilters) {
      return null;
    }

    return rawFilters.reduce((where, rawFilter) => {
      const parsedFilter = this.parseColumnFilter(rawFilter);

      if (!parsedFilter) {
        return where; // Skip invalid filters
      }

      return this.translateColumnFilter(parsedFilter, where);
    }, {} as FindOptionsWhere<RecordType>);
  }

  /**
   * The function `extractListParamsFromURL` parses and extracts list parameters from a given URL in
   * TypeScript.
   * @param {string} url - The `extractListParamsFromURL` function takes a URL string as input and
   * extracts various parameters from the URL to construct options for querying records. The parameters
   * extracted from the URL include `limit`, `offset`, `sort`, `search`, and `filter`.
   * @returns The `extractListParamsFromURL` function returns an array containing three elements:
   *  1. where formatted for ORM - `FindManyOptions<RecordType>`
   *  2. column filters - `ParsedQueryFilter<RecordType>[]`
   *  3. globalSearchText - `string | null`
   */
  protected extractListParamsFromURL(url: string): [FindManyOptions<RecordType>, ParsedQueryFilter<RecordType>[], string | null] {
    const parsableUrl = new URL(`http://localhost:3000${url}`);
    const searchParams = parsableUrl.searchParams;

    const pLimit = searchParams.get('limit');
    const pOffset = searchParams.get('offset');
    const pSort = searchParams.get('sort');
    const pSearch = searchParams.get('search');
    const pSearchDecoded = (pSearch && pSearch !== 'null') ? decodeURIComponent(pSearch) : null;

    const pFilter = searchParams.get('filter');
    const parsedFiltersForReturn = (this.extractColumnFilters(pFilter ?? '') ?? [])
      .map((rf) => this.parseColumnFilter(rf))
      .filter((pf) => pf !== null);
    const parsedFilters = pFilter ? this.parseColumnFilters(pFilter) : null;

    let filters = (parsedFilters ? { where: parsedFilters as FindOptionsWhere<RecordType> | FindOptionsWhere<RecordType>[] } : undefined);

    if (filters && pSearchDecoded) {
      filters.where = [
        filters.where,
        pSearchDecoded ? [
          { id: Like(`%${pSearchDecoded}%`) },
          { name: Like(`%${pSearchDecoded}%`) },
          { createdAt: Like(`%${pSearchDecoded}%`) },
          { updatedAt: Like(`%${pSearchDecoded}%`) },
        ] : null
      ] as FindOptionsWhere<RecordType>[];
    } else if (!filters && pSearchDecoded) {
      filters = {
        where: [
          { id: Like(`%${pSearchDecoded}%`) },
          { name: Like(`%${pSearchDecoded}%`) },
          { createdAt: Like(`%${pSearchDecoded}%`) },
          { updatedAt: Like(`%${pSearchDecoded}%`) },
        ] as FindOptionsWhere<RecordType & { updatedAt: Date | null; }>[]
      };
    }

    return [
      {
        take: this.getQueryInt(pLimit),
        skip: this.getQueryInt(pOffset),
        order: this.processSorting(pSort) ?? undefined,
        ...filters
      },
      parsedFiltersForReturn as ParsedQueryFilter<RecordType>[],
      pSearchDecoded
    ];
  }
}