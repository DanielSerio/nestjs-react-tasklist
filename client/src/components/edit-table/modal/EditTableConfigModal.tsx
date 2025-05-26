import { Fieldset, Flex, Modal, Select } from "@mantine/core";
import { useEditTableContext } from "../edit-table.provider";
import { EditTableFilter } from "../EditTableFilter";
import { useState } from "react";
import type { FilterOperator } from "../reducer/filtering";

export function EditTableConfigModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [{ state }, { setLimit, setFilter }] = useEditTableContext();
  const [newFilter, setNewFilter] = useState({
    id: "id",
    value: "",
    operator: "eq" as FilterOperator,
  });
  return (
    <Modal
      title="Configure"
      opened={isOpen}
      onClose={close}
      size={"85%"}
      styles={{
        content: {
          maxWidth: 724,
        },
      }}
    >
      <Modal.Body>
        <Fieldset legend="Pagination">
          <Select
            label="Records Per Page"
            value={state.limit.toString()}
            data={["1", "5", "10", "25", "50"]}
            onChange={(value) => setLimit(Number(value))}
          />
        </Fieldset>
        <Fieldset legend="Filters">
          <Flex direction="column" gap="md">
            {state.filter.length > 0 &&
              state.filter.map((fltr) => {
                return (
                  <EditTableFilter
                    disabled
                    key={`${fltr.id}-${fltr.value}-${fltr.operator}`}
                    columns={["id", "createdAt", "updatedAt", "name"]}
                    filter={fltr}
                    onChange={(filter) => {
                      const index = state.filter.findIndex(
                        (f) =>
                          f.id === fltr.id &&
                          f.value === fltr.value &&
                          f.operator === fltr.operator
                      );
                      if (index !== -1) {
                        const newFilter = [...state.filter];
                        newFilter[index] = filter;
                        setFilter(newFilter);
                      }
                    }}
                    onRemove={() => {
                      setFilter(state.filter.filter((f) => f !== fltr));
                    }}
                  />
                );
              })}
            <EditTableFilter
              columns={["id", "createdAt", "updatedAt", "name"]}
              filter={newFilter}
              onChange={(filter) => setNewFilter(filter)}
              onAdd={() => {
                const clone = Object.freeze({ ...newFilter });

                setFilter([...state.filter, clone]);
                setNewFilter({
                  id: "id",
                  value: "",
                  operator: "eq" as FilterOperator,
                });
              }}
            />
          </Flex>
        </Fieldset>
      </Modal.Body>
    </Modal>
  );
}
