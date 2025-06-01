import {
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  Textarea,
} from "@mantine/core";
import { TbCancel, TbPlus } from "react-icons/tb";
import { useTaskCreateForm } from "#hooks/kanban/useTaskForm";

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
          <Select
            label="Category"
            value=""
            data={[{ value: "", label: "-- Category --" }]}
            {...form.getInputProps("category")}
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
