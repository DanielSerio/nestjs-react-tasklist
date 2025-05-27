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

    return sortString.split(",").map((s) => {
      const [id, order] = s.split("_");
      return {
        id,
        desc: order.toLowerCase() === "desc",
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

  return useEffect(() => {
    // only run if the state has been defined
    if (state && hasDefinedValues(state)) {
      const asParams = new URLSearchParams(state);
      const currentSearchParams = new URLSearchParams(window.location.search);

      if (asParams.toString() !== currentSearchParams.toString()) {
        for (const key in state) {
          if (state[key] === undefined || state[key] === null) {
            asParams.delete(key);
          } else {
            if (key === "sort") {
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
            } else {
              asParams.set(key, String(state[key]));
            }
          }
        }

        window.history.replaceState({}, "", `?${asParams.toString()}`);
      }
    }
  }, [state, state.sort, state.filter, deps]);
}
