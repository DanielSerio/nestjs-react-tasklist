import { Button, Flex, Group, NumberInput, Textarea } from "@mantine/core";
import { TbCancel, TbDeviceFloppy, TbTrash } from "react-icons/tb";
import type { TaskEditFormProps } from "./types";
import { useTaskEditForm } from "#hooks/kanban/useTaskForm";
import { StatusSelect } from "#components/core/control/StatusSelect";
import { CategorySelect } from "#components/core/control/CategorySelect";

export function EditTaskForm({ task }: TaskEditFormProps) {
  const form = useTaskEditForm(task);

  return (
    <Flex h="100%" direction="column">
      <form className="task-form edit">
        <Flex direction="column">
          <Textarea
            autosize
            resize="vertical"
            label="Task"
            required
            placeholder="Task"
            {...form.getInputProps("name")}
          />
          <StatusSelect label="Status" {...form.getInputProps("statusId")} />
          <CategorySelect
            label="Category"
            {...form.getInputProps("categoryId")}
          />
          <NumberInput
            label="Priority"
            placeholder="NA"
            {...form.getInputProps("priority")}
          />
        </Flex>
        <Group>
          <Button fullWidth rightSection={<TbDeviceFloppy />}>
            Save
          </Button>
          <Button fullWidth color="gray" rightSection={<TbCancel />}>
            Cancel
          </Button>
          <Button fullWidth color="red" rightSection={<TbTrash />}>
            Delete
          </Button>
        </Group>
      </form>
    </Flex>
  );
}
