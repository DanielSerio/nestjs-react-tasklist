import { useSearch } from "@tanstack/react-router";

export function useListDefaults(from: Parameters<typeof useSearch>[0]["from"]) {
  const params = useSearch({
    from,
  });

  const limit = params.limit;
  const offset = params.offset;
  const sorting = params.sort;
  const search = params.search;
  const filter = params.filter;

  const defaults: Record<string, any> = {
    limit,
    offset,
  };

  if (sorting) {
    const sort = sorting.split(/[,]/g).map((colString: string) => {
      const [id, dir] = colString.split(/[_]/g);
      return {
        id,
        desc: `${dir}`.toLowerCase() === "desc",
      };
    });

    defaults.sort = sort;
  }

  if (search) {
    defaults.search = search;
  }

  if (filter) {
    const filters = (filter as string).split(/[,]/g).map((fltr) => {
      const [column, operator, valueText] = fltr.split(/[_]/g);
      let value: string | number | Date = valueText;

      if (column === "id") {
        value = Number(valueText);
      }

      if (column.endsWith("edAt") && typeof value === "string") {
        value = new Date(Date.parse(value));
      }

      return {
        id: column,
        operator,
        value,
      };
    });

    defaults.filter = filters;
  }

  return defaults;
}
