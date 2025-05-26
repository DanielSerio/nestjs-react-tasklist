import { Fieldset, Modal, Select } from "@mantine/core";
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
    <Modal title="Configure" opened={isOpen} onClose={close}>
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
        </Fieldset>
      </Modal.Body>
    </Modal>
  );
}
