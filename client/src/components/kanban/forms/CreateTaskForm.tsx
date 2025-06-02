import { Flex, Group, NumberInput, Textarea } from "@mantine/core";
import { TbPlus } from "react-icons/tb";
import { useTaskCreateForm } from "#hooks/kanban/useTaskForm";
import { CategorySelect } from "#components/core/control/CategorySelect";
import { CancelButton } from "#components/core/button/CancelButton";
import { SubmitButton } from "#components/core/button/SubmitButton";
import type { TaskCreateFormProps } from "./types";
import { useCreateTaskMutation } from "#hooks/kanban/mutations";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "#const/query-client";

export function CreateTaskForm({ onCancelClick }: TaskCreateFormProps) {
  const queryClient = useQueryClient();
  const form = useTaskCreateForm();
  const mutation = useCreateTaskMutation();

  const onSubmit = form.onSubmit(async (values) => {
    try {
      await mutation.mutateAsync({ task: values });
      await queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.tasks.list],
      });

      notifications.show({
        color: "green",
        message: "Successfully created task",
      });

      return;
    } catch (err) {
      notifications.show({
        color: "red",
        message: (err as Error).message,
      });

      return;
    }
  });

  return (
    <Flex h="100%" direction="column">
      <form className="task-form create" onSubmit={onSubmit}>
        <Flex direction="column" gap="xs">
          <Textarea
            autosize
            resize="vertical"
            label="Task"
            required
            placeholder="Task"
            {...form.getInputProps("name")}
          />
          <CategorySelect
            label="Category"
            {...form.getInputProps("categoryId")}
          />
          <NumberInput
            label="Priority"
            placeholder="NA"
            allowDecimal={false}
            {...form.getInputProps("priority")}
          />
        </Flex>
        <Group>
          <SubmitButton isBusy={false} icon={TbPlus} disabled={!form.isValid()}>
            Create
          </SubmitButton>
          <CancelButton onClick={onCancelClick} />
        </Group>
      </form>
    </Flex>
  );
}
