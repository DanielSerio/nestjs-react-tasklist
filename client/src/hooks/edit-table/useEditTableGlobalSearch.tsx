import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";

export function useEditTableGlobalSearch(defaultValue?: string) {
  const [inputValue, setInputValue] = useState(defaultValue ?? "");
  const [globalSearchText] = useDebouncedValue(inputValue, 500);

  return [{ inputText: inputValue, globalSearchText }, setInputValue] as const;
}
