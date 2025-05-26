export type QueryFilterOperator = "ct"
  | "sw"
  | "ew"
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