import { useEffect } from "react";

export interface ColumnSortObject {
  id: string;
  desc: boolean;
}

/**
 * Updates the URL parameters to mirror the state object provided.
 */
export function useUrlStateMirror<State extends Record<string, any>>(
  state: State,
  deps?: any[]
) {
  function isDefined(value: any) {
    return value !== undefined;
  }

  function hasDefinedValues(obj: Record<string, unknown>) {
    return Object.values(obj).some(isDefined);
  }

  function getExistingSortParams(sortString?: string | null) {
    if (!sortString) return [];

    return sortString.split(",").map((sortStr) => {
      const [id, order] = sortStr.split("_");
      return {
        id,
        desc: order.toLowerCase() === "desc",
      };
    });
  }

  function getExistingFilterParams(filterString?: string | null) {
    if (!filterString) return [];

    return filterString.split(/[,]/g).map((filterStr) => {
      const [column, operator, valueText] = filterStr.split(/[_]/g);

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
  }

  function mergeSortParams(
    existing: {
      id: string;
      desc: boolean;
    }[],
    newItems: {
      id: string;
      desc: boolean;
    }[]
  ) {
    const existingMap = new Map(existing.map((item) => [item.id, item]));
    const merged = new Map(existingMap);

    for (const item of newItems) {
      merged.set(item.id, item);
    }

    return Array.from(merged.values());
  }

  function mergeFilterParams(
    existing: {
      id: string;
      operator: string;
      value: string | number | Date;
    }[],
    newItems: {
      id: string;
      operator: string;
      value: string | number | Date;
    }[]
  ) {
    const existingMap = new Map(existing.map((item) => [item.id, item]));
    const merged = new Map(existingMap);

    for (const item of newItems) {
      merged.set(item.id, item);
    }

    return Array.from(merged.values());
  }

  return useEffect(() => {
    // only run if the state has been defined
    if (state && hasDefinedValues(state)) {
      const asParams = new URLSearchParams(state);
      const currentSearchParams = new URLSearchParams(window.location.search);

      if (asParams.toString() !== currentSearchParams.toString()) {
        for (const key in state) {
          if (state[key] === undefined || state[key] === null) {
            asParams.delete(key);
          } else if (key === "sort") {
            const existing = getExistingSortParams(
              currentSearchParams.get("sort") || null
            );
            const newItems = state[key];
            const text = mergeSortParams(existing, newItems)
              .map(
                ({ id, desc }: ColumnSortObject) =>
                  `${id}_${desc ? "desc" : "asc"}`
              )
              .join(",");
            asParams.set(key, text);
          } else if (key === "filter") {
            const existing = getExistingFilterParams();
            const text = mergeFilterParams(existing, state[key])
              .map(({ id, operator, value }) => `${id}_${operator}_${value}`)
              .join(",");
            asParams.set(key, text);
          } else {
            asParams.set(key, String(state[key]));
          }
        }

        window.history.replaceState({}, "", `?${asParams.toString()}`);
      }
    }
  }, [state, state.sort, state.filter, deps]);
}
