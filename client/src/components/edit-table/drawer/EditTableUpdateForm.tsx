import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { EditTableUpdateModalFormProps } from "./form.props";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { FormValidators } from "./form.validators";
import type { EditTableEntity } from "#const/edit-table";
import { BASE_URL } from "#const/api";
import { getSingularNameFromEndpoint } from "#utilities/entity.helpers";
import { Button, Flex, Group, Loader, TextInput } from "@mantine/core";
import { TbDeviceFloppy } from "react-icons/tb";

export function EditTableUpdateForm({
  endpoint,
  state,
  onClose,
}: EditTableUpdateModalFormProps) {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: state.name,
    },
    mode: "uncontrolled",
    validate: zodResolver(FormValidators[endpoint].create),
  });

  const mutation = useMutation({
    mutationKey: [endpoint, "update", state.id],
    async mutationFn(values: Partial<EditTableEntity>) {
      return await fetch(`${BASE_URL}/task-${endpoint}/${state.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    try {
      const result = await mutation.mutateAsync(values);

      if (result.status > 399) {
        throw result;
      }

      await queryClient.invalidateQueries({
        queryKey: [endpoint],
      });

      notifications.show({
        title: `Success`,
        message: `Created ${getSingularNameFromEndpoint(endpoint)}`,
      });

      onClose();
    } catch (err) {
      notifications.show({
        color: "red",
        title: `Create Error`,
        message: (err as Error).message,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column">
        <TextInput label="Name" required {...form.getInputProps("name")} />
      </Flex>
      <Flex component="footer" mt="xs">
        <Group gap="xs">
          <Button color="gray" size="xs">
            Cancel
          </Button>
          <Button
            type="submit"
            size="xs"
            disabled={!form.isValid() || mutation.isPending}
            rightSection={
              mutation.isPending ? (
                <Loader color="gray" size="xs" />
              ) : (
                <TbDeviceFloppy />
              )
            }
          >
            <span>Save</span>
          </Button>
        </Group>
      </Flex>
    </form>
  );
}
