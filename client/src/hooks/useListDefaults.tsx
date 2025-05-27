import { useSearch } from "@tanstack/react-router";

export function useListDefaults(from: Parameters<typeof useSearch>[0]["from"]) {
  const params = useSearch({
    from,
  });

  const limit = params.limit;
  const offset = params.offset;
  const sorting = params.sort;
  const search = params.search;

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

  return defaults;
}
