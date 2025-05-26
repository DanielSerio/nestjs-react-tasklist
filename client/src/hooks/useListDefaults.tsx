import { useSearch } from "@tanstack/react-router";

export function useListDefaults(from: Parameters<typeof useSearch>[0]["from"]) {
  const params = useSearch({
    from,
  });

  const limit = params.limit;
  const offset = params.offset;

  return {
    limit,
    offset,
  };
}
