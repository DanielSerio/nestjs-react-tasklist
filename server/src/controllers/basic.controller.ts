import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { FindManyOptions, FindOptionsOrder } from "typeorm";
import { ZodError, ZodSchema } from "zod";

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

  protected extractListParamsFromURL(url: string): FindManyOptions<RecordType> {
    const parsableUrl = new URL(`http://localhost:3000${url}`);
    const searchParams = parsableUrl.searchParams;

    const pLimit = searchParams.get('limit');
    const pOffset = searchParams.get('offset');
    const pSort = searchParams.get('sort');
    //TODO: Filter need to be processed to integrate with the ORM here
    const pFilter = searchParams.get('filter');

    return {
      take: this.getQueryInt(pLimit),
      skip: this.getQueryInt(pOffset),
      order: this.processSorting(pSort) ?? undefined,
      //where: pFilter ? JSON.parse(decodeURIComponent(pFilter)) : null
    };
  }
}