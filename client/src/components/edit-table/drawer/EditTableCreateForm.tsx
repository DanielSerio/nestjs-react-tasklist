import { Button, Flex, Group, Loader, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { TbDeviceFloppy } from "react-icons/tb";
import type { EditTableCreateModalFormProps } from "./form.props";
import { FormValidators } from "./form.validators";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "#const/api";
import type { EditTableEntity } from "#const/edit-table";
import { getSingularNameFromEndpoint } from "#utilities/entity.helpers";
import type { ZodError } from "zod";
import { CancelButton } from "#components/core/button/CancelButton";
import { SubmitButton } from "#components/core/button/SubmitButton";

export function EditTableCreateForm({
  endpoint,
  onClose,
}: EditTableCreateModalFormProps) {
  const queryClient = useQueryClient();

  const placeholder =
    endpoint === "categories" ? "Task Category Name" : "Task Status Name";

  const form = useForm({
    initialValues: {
      name: "",
    },
    mode: "uncontrolled",
    validate: zodResolver(FormValidators[endpoint].create),
  });

  const mutation = useMutation({
    mutationKey: [endpoint, "create"],
    async mutationFn(values: Partial<EditTableEntity>) {
      return await fetch(`${BASE_URL}/task-${endpoint}`, {
        method: "POST",
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
        message: (err as Error).message ?? (err as ZodError).issues[0]!.message,
      });
    }
  };

  return (
    <form className="edit-table-form" onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column">
        <TextInput
          label="Name"
          required
          placeholder={placeholder}
          {...form.getInputProps("name")}
        />
      </Flex>
      <Flex component="footer" mt="xs">
        <Group gap="xs" w="100%">
          <SubmitButton
            isBusy={mutation.isPending}
            disabled={!form.isValid()}
            icon={TbDeviceFloppy}
          >
            Save
          </SubmitButton>
          <CancelButton onClick={onClose} />
        </Group>
      </Flex>
    </form>
  );
}
