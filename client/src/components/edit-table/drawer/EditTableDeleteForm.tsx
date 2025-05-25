import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Loader,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z, ZodError } from "zod";
import { TbTrash } from "react-icons/tb";
import type { EditTableDeleteModalFormProps } from "./form.props";
import { BASE_URL } from "#const/api";
import { getSingularNameFromEndpoint } from "#utilities/entity.helpers";

export function EditTableDeleteForm({
  endpoint,
  state,
  onClose,
}: EditTableDeleteModalFormProps) {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      imSure: false,
    },
    mode: "uncontrolled",
    validate: zodResolver(
      z.object({
        imSure: z.boolean().superRefine((checked, ctx) => {
          if (!checked) {
            ctx.addIssue({
              code: "custom",
              message: "You must check this box if you wish to proceed",
              path: ["imSure"],
            });
          }
        }),
      })
    ),
  });

  const mutation = useMutation({
    mutationKey: [endpoint, "delete", state.id],
    async mutationFn() {
      return await fetch(`${BASE_URL}/task-${endpoint}/${state.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });

  const handleSubmit = async (values: { imSure: boolean }) => {
    if (!values.imSure) {
      return;
    }

    try {
      const result = await mutation.mutateAsync();

      if (result.status > 399) {
        throw result;
      }

      await queryClient.invalidateQueries({
        queryKey: [endpoint],
      });

      notifications.show({
        title: `Success`,
        message: `Deleted ${getSingularNameFromEndpoint(endpoint)}`,
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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Box py="xs">
        <Text>
          Are you sure you want to delete "<strong>{state.name}</strong>"?
        </Text>
      </Box>
      <Flex direction="column">
        <Checkbox label="I'm Sure" required {...form.getInputProps("imSure")} />
      </Flex>
      <Flex component="footer" mt="xs">
        <Group gap="xs">
          <Button color="gray" size="xs">
            Cancel
          </Button>
          <Button
            type="submit"
            size="xs"
            color="red"
            disabled={!form.isValid() || mutation.isPending}
            rightSection={
              mutation.isPending ? (
                <Loader color="gray" size="xs" />
              ) : (
                <TbTrash />
              )
            }
          >
            <span>Delete</span>
          </Button>
        </Group>
      </Flex>
    </form>
  );
}
