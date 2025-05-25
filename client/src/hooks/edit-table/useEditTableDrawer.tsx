import type { EditTableEndpoint } from "#components/edit-table/edit-table.provider.types";
import type { EditTableEntity } from "#const/edit-table";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useState } from "react";

export type EditTableDrawerMode = "create" | "update" | "delete";
interface EditTableDrawerPayloadBasis {
  mode: EditTableDrawerMode;
  payload?: EditTableEntity | number;
}

interface EditTableDrawerCreatePayload extends EditTableDrawerPayloadBasis {
  mode: "create";
  payload?: never;
}
interface EditTableDrawerUpdatePayload extends EditTableDrawerPayloadBasis {
  mode: "update";
  payload: EditTableEntity;
}
interface EditTableDrawerDeletePayload extends EditTableDrawerPayloadBasis {
  mode: "delete";
  payload: number;
}

export type EditTablePayload =
  | EditTableDrawerCreatePayload
  | EditTableDrawerUpdatePayload
  | EditTableDrawerDeletePayload;

export function useEditTableDrawer({
  endpoint,
}: {
  endpoint: EditTableEndpoint;
}) {
  const [isOpen, { open, close }] = useDisclosure();
  const [payload, setPayload] = useState<null | EditTablePayload>(null);

  const openDrawer = useCallback(
    (payload: EditTablePayload) => {
      setPayload(payload);
      open();
    },
    [setPayload, open]
  );

  const closeDrawer = useCallback(() => {
    setPayload(null);
    close();
  }, [setPayload, open]);

  return [
    { isOpen, payload, endpoint },
    { openDrawer, closeDrawer },
  ] as const;
}
