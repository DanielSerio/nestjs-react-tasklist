import { useEntityList } from "#hooks/useEntityList";
import { Select, type SelectProps } from "@mantine/core";
import { forwardRef, useMemo, type ForwardedRef } from "react";

function StatusSelectComponent(
  props: Omit<SelectProps, "options">,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const query = useEntityList({
    endpoint: "statuses",
    paging: {
      limit: 100_000,
      offset: 0,
    },
  });

  const options = useMemo(
    () =>
      (query.data?.records ?? []).map(({ name, id }) => ({
        value: `${id}`,
        label: name,
      })),
    [query.data, query.fetchStatus]
  );

  if (query.isLoading) {
    return (
      <Select
        data={["Loading..."]}
        ref={ref}
        {...props}
        disabled={true}
        value={"Loading..."}
      />
    );
  }

  return (
    <Select
      data={options}
      ref={ref}
      {...props}
      value={props.value ? `${props.value}` : undefined}
    />
  );
}

export const StatusSelect = forwardRef(StatusSelectComponent);
