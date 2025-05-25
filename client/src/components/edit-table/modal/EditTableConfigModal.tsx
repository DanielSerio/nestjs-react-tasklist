import { Fieldset, Modal, Select } from "@mantine/core";

export function EditTableConfigModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  return (
    <Modal title="Configure" opened={isOpen} onClose={close}>
      <Modal.Body>
        <Fieldset legend="Pagination">
          <Select
            label="Records Per Page"
            value={"25"}
            data={["1", "5", "10", "25", "50"]}
          />
        </Fieldset>
        <Fieldset legend="Filters" disabled></Fieldset>
      </Modal.Body>
    </Modal>
  );
}
