import { Button, ColorInput, Flex, Modal, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "../../hooks";
import { IPalette } from "../../interfaces";

interface IUpsertPaletteDialogProps {
  opened: boolean;
  onClose: () => void;
  fetchPalettes: () => void;
  palette?: IPalette;
}

const UpsertPaletteDialog = ({
  opened,
  onClose,
  fetchPalettes,
  palette,
}: IUpsertPaletteDialogProps) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const form = useForm({
    initialValues: palette || {
      name: "",
      primaryColor: "",
      secondaryColor: "",
      tertiaryColor: "",
      textColor: "",
      backgroundColor: "",
    },
    validate: {
      name: (value: string) => (value ? null : "Required"),
      primaryColor: (value: string) => (value ? null : "Required"),
      secondaryColor: (value: string) => (value ? null : "Required"),
      tertiaryColor: (value: string) => (value ? null : "Required"),
      textColor: (value: string) => (value ? null : "Required"),
      backgroundColor: (value: string) => (value ? null : "Required"),
    },
  });

  const onSubmit = async (values: IPalette) => {
    try {
      const { error } = await supabase.from("palettes").upsert(
        {
          ...values,
          ...(!palette &&
            user && {
              createdBy: user?.id,
            }),
          ...(palette && {
            updatedAt: new Date(),
          }),
        },
        {
          onConflict: "name",
        }
      );
      if (error) throw error;
      fetchPalettes();
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      title={palette ? "Update Palette" : "Add palette"}
      opened={opened}
      withCloseButton
      onClose={onClose}
      size="xl"
      radius="md"
      centered
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Palette Name"
          placeholder="Palette name"
          disabled={palette}
          {...form.getInputProps("name")}
        />
        <ColorInput
          placeholder="Pick color"
          label="Primary Color"
          withAsterisk
          {...form.getInputProps("primaryColor")}
        />
        <ColorInput
          placeholder="Pick color"
          label="Secondary Color"
          withAsterisk
          {...form.getInputProps("secondaryColor")}
        />
        <ColorInput
          placeholder="Pick color"
          label="Tertiary Color"
          withAsterisk
          {...form.getInputProps("tertiaryColor")}
        />
        <ColorInput
          placeholder="Pick color"
          label="Text Color"
          withAsterisk
          {...form.getInputProps("textColor")}
        />
        <ColorInput
          placeholder="Pick color"
          label="Background Color"
          withAsterisk
          {...form.getInputProps("backgroundColor")}
        />
        <Flex justify="flex-end" mt="lg">
          <Button variant="filled" type="submit">
            {palette ? "Update" : "Save"}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default UpsertPaletteDialog;
