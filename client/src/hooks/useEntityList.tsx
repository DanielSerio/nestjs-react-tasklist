import { BASE_URL } from "#const/api";
import type { EditTableEntity } from "#const/edit-table";
import { QUERY_KEYS } from "#const/query-client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export interface ListPagingOptions {
  limit: number;
  offset: number;
}

export interface UseEntityListOptions {
  endpoint: "statuses" | "categories";
  paging: ListPagingOptions;
  sort?: SortingState | null;
  filter?: ColumnFiltersState | null;
  globalSearch?: string | null;
  select?: string | null;
}

export interface EntityListResponse<Type extends EditTableEntity> {
  records: Type[];
  limit: number;
  offset: number;
  filter: ColumnFiltersState | null;
  sort: SortingState | null;
  select: string;
  search?: string | null;
  totals: {
    records: number;
    pages: number;
  };
}

function constructQueryKey({
  endpoint,
  paging,
  sort,
  filter,
  globalSearch,
  select,
}: UseEntityListOptions) {
  const queryKeys = QUERY_KEYS[endpoint].list;
  const limitKey = `limit=${paging.limit}`;
  const offsetKey = `offset=${paging.offset}`;
  const sortKey = `sort=${sort ? JSON.stringify(sort) : "null"}`;
  const filterKey = `filter=${filter ? JSON.stringify(filter) : "null"}`;
  const searchKey = `search=${globalSearch ? globalSearch : "null"}`;
  const selectKey = `select=${select ?? "*"}`;

  return [
    ...queryKeys,
    limitKey,
    offsetKey,
    sortKey,
    filterKey,
    searchKey,
    selectKey,
  ];
}

function getPagingChunk({ limit, offset }: ListPagingOptions) {
  return `limit=${~~limit}&offset=${~~offset}`;
}

function getSortingChunk(sort?: SortingState | null) {
  const nullValue = `sort=null`;

  if (!sort) {
    return nullValue;
  }

  const sortStrings = sort.map((s) => {
    return `${s.id}_${s.desc ? "desc" : "asc"}`;
  });

  if (sortStrings.length === 0) {
    return nullValue;
  }

  return `sort=${encodeURIComponent(JSON.stringify(sortStrings))}`;
}

function getFilteringChunk(filter?: ColumnFiltersState | null) {
  const nullValue = `filter=null`;

  if (!filter) {
    return nullValue;
  }

  const filterStrings = filter.map((s) => {
    return `${s.id}_${s.value}`;
  });

  if (filterStrings.length === 0) {
    return nullValue;
  }

  return `filter=${encodeURIComponent(JSON.stringify(filterStrings))}`;
}

function getGlobalSearchChunk(search?: string | null) {
  if (!search) {
    return `search=null`;
  }

  return `search=${search}`;
}

/**
 * Fetches entity data based on specified options.
 */
export function useEntityList(options: UseEntityListOptions) {
  function constructApiUrl(opts: Omit<UseEntityListOptions, "endpoint">) {
    const baseUrl = `${BASE_URL}/task-${options.endpoint}`;
    const urlSegments = [
      getPagingChunk(opts.paging),
      getSortingChunk(opts.sort),
      getFilteringChunk(opts.filter),
      getGlobalSearchChunk(opts.globalSearch),
      `select=${opts.select ?? "*"}`,
    ];

    return `${baseUrl}?${urlSegments.join("&")}`;
  }

  async function queryFn(opts: Omit<UseEntityListOptions, "endpoint">) {
    const url = constructApiUrl(opts);

    const results = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = (await results.json()) as EntityListResponse<EditTableEntity>;

    return {
      records: data.records,
      filter: data.filter,
      sort: data.sort,
      select: data.select,
      search: data.search,
      totals: data.totals,
      paging: {
        limit: data.limit,
        offset: data.offset,
      },
    };
  }

  return useQuery<Awaited<ReturnType<typeof queryFn>>>({
    queryKey: constructQueryKey(options),
    queryFn: () => queryFn(options),
    placeholderData: keepPreviousData,
  });
}
