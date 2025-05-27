import { useSearch } from "@tanstack/react-router";

export function useListDefaults(from: Parameters<typeof useSearch>[0]["from"]) {
  const params = useSearch({
    from,
  });

  const limit = params.limit;
  const offset = params.offset;
  const sorting = params.sort;

  if (sorting) {
    const sort = sorting.split(/[,]/g).map((colString: string) => {
      const [id, dir] = colString.split(/[_]/g);
      return {
        id,
        desc: `${dir}`.toLowerCase() === "desc",
      };
    });

    return {
      limit,
      offset,
      sort,
    };
  }

  return {
    limit,
    offset,
  };
}
