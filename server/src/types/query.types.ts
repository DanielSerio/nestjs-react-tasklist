export type QueryFilterOperator = "ct"
  | "sw"
  | "ew"
  | "ne"
  | "eq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "in"
  | "nin";

interface QueryFilterBasis {
  id: string | number;
  value: any; // <- this truly can be any type
  operator: QueryFilterOperator & (string | {});
}

export interface RawQueryFilter extends QueryFilterBasis {
  id: string;
  value: string;
}

export interface ParsedQueryFilter<Type = unknown> {
  id: string;
  value: Type;
  operator: QueryFilterOperator;
}

export type ListFilteringReturn<RecordType> = {
  columnFilters: ParsedQueryFilter<RecordType>[],
  search: string | null;
};

export type ListSortingReturn<RecordType> = { id: keyof RecordType; desc: boolean; }[];