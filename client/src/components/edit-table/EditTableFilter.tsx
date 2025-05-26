import type { EditTableEntity } from "#const/edit-table";
import { ActionIcon, Group, Select, TagsInput, TextInput } from "@mantine/core";
import type { EditTableFilterValue, FilterOperator } from "./reducer/filtering";
import { TbPlus, TbTrash } from "react-icons/tb";
import { useEffect, useState } from "react";

export interface EditTableFilterPropsBasis<T> {
  filter: EditTableFilterValue<T>;
  columns: (keyof EditTableEntity | ({} & string))[];
  onChange: (value: EditTableFilterValue<T>) => void;
  onRemove?: () => void;
  onAdd?: () => void;
}

export interface EditTableFilterAddProps<T>
  extends EditTableFilterPropsBasis<T> {
  onRemove?: never;
  onAdd: () => void;
}

export interface EditTableFilterEditProps<T>
  extends EditTableFilterPropsBasis<T> {
  onRemove: () => void;
  onAdd?: never;
}

export type EditTableFilterProps<T> =
  | EditTableFilterAddProps<T>
  | EditTableFilterEditProps<T>;

export function EditTableFilter<T>({
  columns,
  filter,
  onChange,
  onAdd,
  onRemove,
}: EditTableFilterProps<T>) {
  const [arrayValues, setArrayValues] = useState<string[]>([]);
  let fieldType = "text";
  let filterOptions = [
    {
      label: "Contains",
      value: "ct",
    },
    {
      label: "Starts with",
      value: "sw",
    },
    {
      label: "Ends with",
      value: "ew",
    },
    {
      label: "Equals",
      value: "eq",
    },
    {
      label: "Not equals",
      value: "neq",
    },
    {
      label: "Greater than",
      value: "gt",
    },
    {
      label: "Greater than or equal to",
      value: "gte",
    },
    {
      label: "Less than",
      value: "lt",
    },
    {
      label: "Less than or equal to",
      value: "lte",
    },
    {
      label: "In",
      value: "in",
    },
    {
      label: "Not in",
      value: "nin",
    },
  ];

  const dateColumns = columns.filter(
    (col) => col === "createdAt" || col === "updatedAt"
  );
  const intColumns = columns.filter((col) => col === "id");

  if (dateColumns.includes(filter.id)) {
    fieldType = "date";
    filterOptions = [
      {
        label: "Before",
        value: "lt",
      },
      {
        label: "On or before",
        value: "lte",
      },
      {
        label: "After",
        value: "gt",
      },
      {
        label: "On or after",
        value: "gte",
      },
      {
        label: "Is",
        value: "eq",
      },
    ];
  }

  if (intColumns.includes(filter.id)) {
    fieldType = "number";
  }

  if (fieldType === "text") {
    filterOptions = [
      {
        label: "Contains",
        value: "ct",
      },
      {
        label: "Starts with",
        value: "sw",
      },
      {
        label: "Ends with",
        value: "ew",
      },
      {
        label: "Is",
        value: "eq",
      },
      {
        label: "Is Not",
        value: "neq",
      },
      {
        label: "In",
        value: "in",
      },
      {
        label: "Not In",
        value: "nin",
      },
    ];
  }

  const isArrayType = filter.operator === "in" || filter.operator === "nin";

  useEffect(() => {
    if (isArrayType && filter.value) {
      setArrayValues(JSON.parse(`${filter.value}`));
    }
  }, []);

  return (
    <Group>
      <Select
        size="xs"
        value={filter.id}
        data={columns}
        onChange={(value: string | null) => {
          if (value) {
            onChange({
              id: value as keyof EditTableEntity,
              value: filter.value,
              operator: filter.operator,
            });
          }
        }}
      />
      <Select
        size="xs"
        value={filter.operator}
        data={filterOptions}
        onChange={(value: string | null) => {
          if (value) {
            onChange({
              id: filter.id,
              value: filter.value,
              operator: value as FilterOperator,
            });
          }
        }}
      />

      {!!isArrayType ? (
        <TagsInput
          size="xs"
          type={fieldType}
          data={arrayValues}
          value={arrayValues}
          onChange={(values) => {
            setArrayValues(values);
            onChange({
              ...filter,
              value: JSON.stringify(values) as T,
            });
          }}
        />
      ) : (
        <TextInput
          size="xs"
          type={fieldType}
          value={`${filter.value}`}
          onChange={(event) => {
            const target = event.target;

            if (fieldType === "date" && target.valueAsDate) {
              onChange({
                ...filter,
                value: target.valueAsDate as T,
              });
            } else if (fieldType === "number" && target.valueAsNumber) {
              onChange({
                ...filter,
                value: target.valueAsNumber as T,
              });
            } else {
              if (target.value) {
                onChange({
                  ...filter,
                  value: target.value as T,
                });
              }
            }
          }}
        />
      )}
      {!!onAdd && (
        <ActionIcon color="blue" variant="light" onClick={onAdd}>
          <TbPlus />
        </ActionIcon>
      )}
      {!!onRemove && (
        <ActionIcon color="red" variant="light" onClick={onRemove}>
          <TbTrash />
        </ActionIcon>
      )}
    </Group>
  );
}
