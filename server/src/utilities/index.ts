/**
 * Takes an array of items and a function to extract keys, then groups the items based on those keys.
 * @param {T[]} list - The `list` parameter is an array of elements of type `T`.
 * @param getKey - The `getKey` parameter is a function that takes an item of type `T` as input and
 * returns a key of type `K`. This function is used to determine the grouping key for each item in the
 * input list.
 * @returns The `groupBy` function is returning an object where the keys are determined by the result
 * of the `getKey` function applied to each item in the input `list`, and the values are arrays of
 * items from the input `list` that share the same key.
 */
export const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) => {
  return list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);

    if (!previous[group]) {
      previous[group] = [];
    }

    previous[group].push(currentItem);

    return previous;
  }, {} as Record<K, T[]>);
}

