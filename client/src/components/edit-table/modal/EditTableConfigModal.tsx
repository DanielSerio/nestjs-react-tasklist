import { Fieldset, Modal, Select } from "@mantine/core";
import { useEditTableContext } from "../edit-table.provider";

export function EditTableConfigModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [{ state }, { setLimit }] = useEditTableContext();

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
        <Fieldset legend="Filters" disabled></Fieldset>
      </Modal.Body>
    </Modal>
  );
}
