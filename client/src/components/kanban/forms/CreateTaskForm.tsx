import { Button, Flex, Group, NumberInput, Textarea } from "@mantine/core";
import { TbCancel, TbPlus } from "react-icons/tb";
import { useTaskCreateForm } from "#hooks/kanban/useTaskForm";
import { CategorySelect } from "#components/core/control/CategorySelect";

export function CreateTaskForm() {
  const form = useTaskCreateForm();

  return (
    <Flex h="100%" direction="column">
      <form className="task-form create">
        <Flex direction="column">
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
            {...form.getInputProps("priority")}
          />
        </Flex>
        <Group>
          <Button fullWidth rightSection={<TbPlus />}>
            Create
          </Button>
          <Button fullWidth color="gray" rightSection={<TbCancel />}>
            Cancel
          </Button>
        </Group>
      </form>
    </Flex>
  );
}
