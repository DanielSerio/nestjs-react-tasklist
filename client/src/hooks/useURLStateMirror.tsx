import { useEffect } from "react";

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
            asParams.set(key, String(state[key]));
          }
        }

        window.history.replaceState({}, "", `?${asParams.toString()}`);
      }
    }
  }, [state, deps]);
}
