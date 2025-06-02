import { Button, Flex, Group, NumberInput, Textarea } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
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
import { QUERY_KEYS } from "#const/query-client";

export function EditTaskForm({ task, onDismiss }: TaskEditFormProps) {
  const queryClient = useQueryClient();
  const form = useTaskEditForm(task);
  const updateMutation = useUpdateTaskMutation(task.id);
  const deleteMutation = useDeleteTaskMutation(task.id);

  const onSubmit = form.onSubmit(async (values) => {
    try {
      await updateMutation.mutateAsync({
        task: {
          statusId: +values.statusId!,
          categoryId: values.categoryId ? +values.categoryId : null,
          name: values.name.trim(),
          priority: values.priority ? +values.priority : null,
        },
      });
      await queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.tasks.list],
      });

      notifications.show({
        color: "green",
        message: "Successfully updated task",
      });

      onDismiss();

      return;
    } catch (err) {
      notifications.show({
        color: "red",
        message: (err as Error).message,
      });

      return;
    }
  });

  const onDeleteClick = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.tasks.list],
      });

      notifications.show({
        color: "green",
        message: "Successfully deleted task",
      });

      onDismiss();

      return;
    } catch (err) {
      notifications.show({
        color: "red",
        message: (err as Error).message,
      });

      return;
    }
  };

  return (
    <Flex h="100%" direction="column">
      <form className="task-form edit" onSubmit={onSubmit}>
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
          <CancelButton onClick={onDismiss} />
          <Button
            type="button"
            fullWidth
            color="red"
            rightSection={<TbTrash />}
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        </Group>
      </form>
    </Flex>
  );
}
