import type { useEditTableDrawer } from "#hooks/edit-table/useEditTableDrawer";
import { Drawer } from "@mantine/core";
import { EditTableCreateForm } from "./EditTableCreateForm";
import { EditTableUpdateForm } from "./EditTableUpdateForm";
import { EditTableDeleteForm } from "./EditTableDeleteForm";
import type { EditTableEntity } from "#const/edit-table";
import { getSingularNameFromEndpoint } from "#utilities/entity.helpers";

export function EditTableDrawer({
  controller: [{ isOpen, endpoint, payload }, { closeDrawer }],
}: {
  controller: ReturnType<typeof useEditTableDrawer>;
}) {
  const mode = payload?.mode;
  const state = payload?.payload;
  const entityName = getSingularNameFromEndpoint(endpoint);

  const formattedTitle = () => {
    if (mode) {
      const capitalMode = `${mode[0].toUpperCase()}${mode.slice(1)}`;

      return `${capitalMode} ${entityName}`;
    }

    return "";
  };

  return (
    <Drawer
      title={formattedTitle()}
      position="right"
      opened={isOpen && !!payload}
      onClose={closeDrawer}
    >
      <Drawer.Body>
        {mode === "create" && (
          <EditTableCreateForm endpoint={endpoint} onClose={closeDrawer} />
        )}
        {mode === "update" && state && (
          <EditTableUpdateForm
            endpoint={endpoint}
            state={state as EditTableEntity}
            onClose={closeDrawer}
          />
        )}
        {mode === "delete" && state && (
          <EditTableDeleteForm
            endpoint={endpoint}
            state={state as number}
            onClose={closeDrawer}
          />
        )}
      </Drawer.Body>
    </Drawer>
  );
}
