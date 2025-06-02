import { Button, Flex, Group, NumberInput, Textarea } from "@mantine/core";
import { TbDeviceFloppy, TbTrash } from "react-icons/tb";
import type { TaskEditFormProps } from "./types";
import { useTaskEditForm } from "#hooks/kanban/useTaskForm";
import { StatusSelect } from "#components/core/control/StatusSelect";
import { CategorySelect } from "#components/core/control/CategorySelect";
import { CancelButton } from "#components/core/button/CancelButton";
import { SubmitButton } from "#components/core/button/SubmitButton";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "#hooks/kanban/mutations";

export function EditTaskForm({ task, onCancelClick }: TaskEditFormProps) {
  const form = useTaskEditForm(task);
  const updateMutation = useUpdateTaskMutation(task.id);
  const deleteMutation = useDeleteTaskMutation(task.id);

  return (
    <Flex h="100%" direction="column">
      <form className="task-form edit">
        <Flex direction="column" gap="xs">
          <Textarea
            autosize
            resize="vertical"
            label="Task"
            required
            placeholder="Task"
            {...form.getInputProps("name")}
            error={form.errors.name}
          />
          <StatusSelect
            label="Status"
            {...form.getInputProps("statusId")}
            error={form.errors.statusId}
          />
          <CategorySelect
            label="Category"
            {...form.getInputProps("categoryId")}
            error={form.errors.categoryId}
          />
          <NumberInput
            label="Priority"
            placeholder="NA"
            {...form.getInputProps("priority")}
            error={form.errors.priority}
          />
        </Flex>
        <Group>
          <SubmitButton
            isBusy={false}
            icon={TbDeviceFloppy}
            disabled={!form.isValid()}
          >
            Save
          </SubmitButton>
          <CancelButton onClick={onCancelClick} />
          <Button fullWidth color="red" rightSection={<TbTrash />}>
            Delete
          </Button>
        </Group>
      </form>
    </Flex>
  );
}
