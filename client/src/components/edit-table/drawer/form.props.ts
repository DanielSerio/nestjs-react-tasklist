import type { EditTableEntity } from "#const/edit-table";
import type { EditTableDeletePayload } from "#hooks/edit-table/useEditTableDrawer";
import type { EditTableEndpoint } from "../edit-table.provider.types";

export interface EditTableModalFormPropsBasis {
  endpoint: EditTableEndpoint;
  state?: EditTableEntity | EditTableDeletePayload;
  onClose: () => void;
}

export interface EditTableCreateModalFormProps extends EditTableModalFormPropsBasis {
  endpoint: EditTableEndpoint;
  state?: never;
}

export interface EditTableUpdateModalFormProps extends EditTableModalFormPropsBasis {
  endpoint: EditTableEndpoint;
  state: EditTableEntity;
}

export interface EditTableDeleteModalFormProps extends EditTableModalFormPropsBasis {
  endpoint: EditTableEndpoint;
  state: EditTableDeletePayload;
}