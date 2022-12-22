import {
  ActionIcon,
  Button,
  FileButton,
  Flex,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { IconTrash } from "@tabler/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { IFont } from "../../interfaces";

interface IUpsertFontDialogProps {
  opened: boolean;
  onClose: () => void;
  fetchFonts: () => void;
  font?: IFont;
}

const UpsertFontDialog = ({
  opened,
  onClose,
  fetchFonts,
  font,
}: IUpsertFontDialogProps) => {
  const [fonts, setFonts] = useState<{ value: any; label: string }[]>([]);

  useEffect(() => {
    fetchGoogleFonts();
  }, []);

  const fetchGoogleFonts = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`
      );
      setFonts(
        res.data.items.map(
          (font: {
            family: string;
            files: {
              regular: string;
            };
          }) => ({
            label: font.family,
            value: font.files.regular
              ? font.files.regular.replace("http:", "")
              : font.files[Object.keys(font.files)[0] as "regular"].replace(
                  "http:",
                  ""
                ),
          })
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const supabase = useSupabaseClient();
  const user = useUser();

  const form = useForm<{
    name: string;
    titleFont: string | File;
    headerFont: string | File;
    bodyFont: string | File;
  }>({
    initialValues: {
      name: font?.name || "",
      titleFont: font?.titleFont.url || "",
      headerFont: font?.headerFont.url || "",
      bodyFont: font?.bodyFont.url || "",
    },
    validate: {
      name: (value: string) => (value ? null : "Required"),
      titleFont: (value: string) => (value ? null : "Required"),
      headerFont: (value: string) => (value ? null : "Required"),
      bodyFont: (value: string) => (value ? null : "Required"),
    },
  });

  const onSubmit = async (values: {
    name: string;
    titleFont: string | File;
    headerFont: string | File;
    bodyFont: string | File;
  }) => {
    try {
      let titleFont:
        | {
            name: string;
            url: string;
            custom?: boolean;
          }
        | undefined;
      let headerFont:
        | {
            name: string;
            url: string;
            custom?: boolean;
          }
        | undefined;
      let bodyFont:
        | {
            name: string;
            url: string;
            custom?: boolean;
          }
        | undefined;
      if (typeof values.titleFont === "string") {
        const font = fonts.find((font) => font.value === values.titleFont);
        if (font)
          titleFont = {
            name: font.label,
            url: font.value,
          };
      } else {
        const fileName = `${user?.id}-${new Date().getTime().toString()}-${
          values.titleFont.name.replace(/\.[^/.]+$/, "")
        }`;
        const { data, error } = await supabase.storage
          .from("fonts")
          .upload(fileName, values.titleFont);
        if (error) throw error;
        titleFont = {
          name: values.titleFont.name,
          url: data.path,
          custom: true,
        };
      }
      if (typeof values.headerFont === "string") {
        const font = fonts.find((font) => font.value === values.headerFont);
        if (font)
          headerFont = {
            name: font.label,
            url: font.value,
          };
      } else {
        const fileName = `${user?.id}-${new Date().getTime().toString()}-${
          values.headerFont.name.replace(/\.[^/.]+$/, "")
        }`;
        const { data, error } = await supabase.storage
          .from("fonts")
          .upload(fileName, values.headerFont);
        if (error) throw error;
        headerFont = {
          name: values.headerFont.name,
          url: data.path,
          custom: true,
        };
      }
      if (typeof values.bodyFont === "string") {
        const font = fonts.find((font) => font.value === values.bodyFont);
        if (font)
          bodyFont = {
            name: font.label,
            url: font.value,
          };
      } else {
        const fileName = `${user?.id}-${new Date().getTime().toString()}-${
          values.bodyFont.name.replace(/\.[^/.]+$/, "")
        }`;
        const { data, error } = await supabase.storage
          .from("fonts")
          .upload(fileName, values.bodyFont);
        if (error) throw error;
        bodyFont = {
          name: values.bodyFont.name,
          url: data.path,
          custom: true,
        };
      }
      const { error } = await supabase.from("fonts").upsert(
        {
          name: values.name,
          titleFont: titleFont,
          headerFont: headerFont,
          bodyFont: bodyFont,
          ...(!font &&
            user && {
              createdBy: user?.id,
            }),
          ...(font && {
            updatedAt: new Date(),
          }),
        },
        {
          onConflict: "name",
        }
      );
      if (error) throw error;
      fetchFonts();
    } catch (err) {
      console.error(err);
    } finally {
      onClose();
    }
  };

  const deleteFontFromStorage = async (
    fontType: "titleFont" | "headerFont" | "bodyFont",
    fileName: string
  ) => {
    try {
      const { error } = await supabase.storage.from("fonts").remove([fileName]);
      if (error) throw error;
      if (font) {
        font[fontType].custom = false;
        form.setFieldValue(fontType, "");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal
      title={font ? "Update Font" : "Add font"}
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
          disabled={font}
          label="Font Collection Name"
          placeholder="Font Collection Nam"
          {...form.getInputProps("name")}
        />
        <Group my="md" align="flex-end">
          {font?.titleFont.custom ? (
            <>
              <Text>{font?.titleFont.name}</Text>
              <ActionIcon
                variant="light"
                color="red"
                onClick={() =>
                  deleteFontFromStorage("titleFont", font?.titleFont.url)
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
            </>
          ) : (
            <>
              {typeof form.values.titleFont === "string" ? (
                <>
                  <Select
                    withAsterisk
                    searchable
                    label="Title Font"
                    placeholder="Pick one"
                    data={fonts}
                    {...form.getInputProps("titleFont")}
                  />
                  <FileButton {...form.getInputProps("titleFont")}>
                    {(props) => <Button {...props}>Upload font</Button>}
                  </FileButton>
                </>
              ) : (
                <>
                  <Text>{form.values.titleFont.name}</Text>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => form.setFieldValue("titleFont", "")}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </>
              )}
            </>
          )}
        </Group>
        <Group my="md" align="flex-end">
          {font?.headerFont.custom ? (
            <>
              <Text>{font?.headerFont.name}</Text>
              <ActionIcon
                variant="light"
                color="red"
                onClick={() =>
                  deleteFontFromStorage("headerFont", font?.headerFont.url)
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
            </>
          ) : (
            <>
              {typeof form.values.headerFont === "string" ? (
                <>
                  <Select
                    withAsterisk
                    searchable
                    label="Header Font"
                    placeholder="Pick one"
                    data={fonts}
                    {...form.getInputProps("headerFont")}
                  />
                  <FileButton {...form.getInputProps("headerFont")}>
                    {(props) => <Button {...props}>Upload font</Button>}
                  </FileButton>
                </>
              ) : (
                <>
                  <Text>{form.values.headerFont.name}</Text>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => form.setFieldValue("headerFont", "")}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </>
              )}
            </>
          )}
        </Group>
        <Group my="md" align="flex-end">
          {font?.bodyFont.custom ? (
            <>
              <Text>{font?.bodyFont.name}</Text>
              <ActionIcon
                variant="light"
                color="red"
                onClick={() =>
                  deleteFontFromStorage("bodyFont", font?.bodyFont.url)
                }
              >
                <IconTrash size={16} />
              </ActionIcon>
            </>
          ) : (
            <>
              {typeof form.values.bodyFont === "string" ? (
                <>
                  <Select
                    withAsterisk
                    searchable
                    label="Body Font"
                    placeholder="Pick one"
                    data={fonts}
                    {...form.getInputProps("bodyFont")}
                  />
                  <FileButton {...form.getInputProps("bodyFont")}>
                    {(props) => <Button {...props}>Upload font</Button>}
                  </FileButton>
                </>
              ) : (
                <>
                  <Text>{form.values.bodyFont.name}</Text>
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => form.setFieldValue("bodyFont", "")}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </>
              )}
            </>
          )}
        </Group>
        <Flex justify="flex-end" mt="lg">
          <Button variant="filled" type="submit">
            {font ? "Update" : "Save"}
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

export default UpsertFontDialog;
