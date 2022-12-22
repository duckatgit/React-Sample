import { useState, useEffect, useCallback } from "react";
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  Indicator,
  Popover,
  Stack,
  Text,
  HoverCard,
  Box,
  Flex,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconCheck, IconPalette, IconPencil, IconPlus } from "@tabler/icons";
import { IFont, IPalette } from "../../interfaces";
import { useDialog, useUser } from "../../hooks";
import UpsertPaletteDialog from "./UpsertPaletteDialog";
import UpsertFontDialog from "./UpsertFontDialog";
import theme from "../../config/theme";

interface IStyleSelectorProps {
  selectedPalette: IPalette | null;
  setSelectedPalette: (palette: IPalette) => void;
  selectedFont: IFont | null;
  setSelectedFont: (font: IFont) => void;
}

const StyleSelector = ({
  selectedFont,
  setSelectedFont,
  selectedPalette,
  setSelectedPalette,
}: IStyleSelectorProps) => {
  const [palettes, setPalettes] = useState<IPalette[]>([]);
  const [addPalette, openAddPalette, closeAddPalette] = useDialog(false);
  const [editPalette, setEditPalette] = useState<IPalette | null>(null);
  const [fonts, setFonts] = useState<IFont[]>([]);
  const [addFont, openAddFont, closeAddFont] = useDialog(false);
  const [editFont, setEditFont] = useState<IFont | null>(null);

  const supabase = useSupabaseClient();
  const user = useUser();

  const fetchPalettes = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("palettes")
        .select(
          "name, primaryColor, secondaryColor, tertiaryColor, textColor, backgroundColor"
        );
      if (error) throw error;
      setPalettes(data);
    } catch (err) {
      console.error(err);
    }
  }, [supabase]);

  const fetchFonts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("fonts")
        .select("name, titleFont, headerFont, bodyFont");
      if (error) throw error;
      setFonts(data);
    } catch (err) {
      console.error(err);
    }
  }, [supabase]);

  useEffect(() => {
    fetchPalettes();
    fetchFonts();
  }, [fetchFonts, fetchPalettes]);

  const handleEditPalette = (palette: IPalette) => {
    setEditPalette(palette);
    openAddPalette();
  };

  const handleEditFont = (font: IFont) => {
    setEditFont(font);
    openAddFont();
  };

  return (
    <>
      {!editPalette && (
        <UpsertPaletteDialog
          opened={addPalette}
          onClose={closeAddPalette}
          fetchPalettes={fetchPalettes}
        />
      )}
      {editPalette && (
        <UpsertPaletteDialog
          opened={addPalette}
          onClose={() => {
            closeAddPalette();
            setEditPalette(null);
          }}
          palette={editPalette}
          fetchPalettes={fetchPalettes}
        />
      )}
      {!editFont && (
        <UpsertFontDialog
          opened={addFont}
          onClose={closeAddFont}
          fetchFonts={fetchFonts}
        />
      )}
      {editFont && (
        <UpsertFontDialog
          opened={addFont}
          onClose={() => {
            closeAddFont();
            setEditFont(null);
          }}
          font={editFont}
          fetchFonts={fetchFonts}
        />
      )}
      <Popover
        width={338}
        position="right-start"
        withArrow
        shadow="md"
        offset={20}
        styles={(theme) => ({
          dropdown: {
            borderColor: theme.colors.dark,
          },
          arrow: {
            borderColor: theme.colors.dark,
          },
        })}
      >
        <Popover.Target>
          <div>
            <HoverCard shadow="md" position="right">
              <HoverCard.Target>
                <ActionIcon
                  variant="subtle"
                  color={theme.colors.blue[6]}
                  sx={{
                    width: 48,
                    height: 48,
                  }}
                  className="menu-bar-button"
                >
                  <IconPalette
                    className="menu-bar-icon"
                    size={32}
                    color={theme.colors.dark[3]}
                  />
                </ActionIcon>
              </HoverCard.Target>
              <HoverCard.Dropdown
                bg={theme.colors.dark[4]}
                c="#fff"
                sx={{ border: "none" }}
              >
                <Text size="sm">Style Selector</Text>
              </HoverCard.Dropdown>
            </HoverCard>
          </div>
        </Popover.Target>
        <Popover.Dropdown
          p="lg"
          sx={(theme) => ({
            backgroundColor: theme.colors.dark,
          })}
        >
          <Text size="md" fw={700} color="white">
            Style Selector
          </Text>
          <Text size="md" fw={700} color="white" mt="xl">
            Palettes
          </Text>
          <Group mt="md" p="md" sx={{ overflowX: "auto" }} noWrap>
            {palettes.map((palette) => (
              <Indicator
                key={palette.name}
                label={<IconPencil size={16} />}
                size={28}
                offset={4}
                color="dark"
                className="cursor-pointer"
                onClick={() => handleEditPalette(palette)}
                disabled={!user}
              >
                <Indicator
                  label={<IconCheck size={16} />}
                  size={28}
                  offset={8}
                  className="cursor-pointer"
                  position="top-start"
                  disabled={palette.name !== selectedPalette?.name}
                >
                  <Grid
                    w={62}
                    h={62}
                    gutter={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedPalette(palette);
                    }}
                  >
                    <Grid.Col span={4} bg={palette.primaryColor} />
                    <Grid.Col span={4} bg={palette.secondaryColor} />
                    <Grid.Col span={4} bg={palette.tertiaryColor} />
                  </Grid>
                </Indicator>
              </Indicator>
            ))}
            {user && (
              <ActionIcon
                variant="outline"
                color="gray"
                w={62}
                miw={62}
                h={62}
                onClick={openAddPalette}
              >
                <IconPlus size={36} color="white" />
              </ActionIcon>
            )}
          </Group>
          <Text size="md" fw={700} color="white" mt="xl" mb="xl">
            Padding
          </Text>
          <Flex justify="space-between" >
            <Box
              component="div"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[3],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[9],
                textAlign: "center",
                padding: theme.spacing.md,
                borderRadius: theme.radius.sm,
                cursor: "pointer",

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[1],
                },
              })}
            >
              Small
            </Box>
            <Box
              component="div"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[3],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[9],
                textAlign: "center",
                padding: theme.spacing.md,
                borderRadius: theme.radius.sm,
                cursor: "pointer",

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[1],
                },
              })}
            >
              Medium
            </Box>
            <Box
              component="div"
              sx={(theme) => ({
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[3],
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[9],
                textAlign: "center",
                padding: theme.spacing.md,
                borderRadius: theme.radius.sm,
                cursor: "pointer",

                "&:hover": {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[1],
                },
              })}
            >
              Large
            </Box>
          </Flex>
          <Text size="md" fw={700} color="white" mt="xl">
            Fonts
          </Text>
          <Stack mt="md" p="md" mah={320} sx={{ overflowY: "auto" }}>
            {fonts.map((font) => (
              <Indicator
                key={font.name}
                label={<IconPencil size={16} />}
                size={28}
                offset={4}
                color="dark"
                className="cursor-pointer"
                onClick={() => handleEditFont(font)}
                disabled={!user}
              >
                <Indicator
                  label={<IconCheck size={16} />}
                  size={28}
                  offset={8}
                  className="cursor-pointer"
                  position="top-start"
                  disabled={font.name !== selectedFont?.name}
                >
                  <Button
                    variant="outline"
                    color="gray"
                    fullWidth
                    onClick={(event: any) => {
                      event.stopPropagation();
                      setSelectedFont(font);
                    }}
                  >
                    {font.name}
                  </Button>
                </Indicator>
              </Indicator>
            ))}
            {user && (
              <Button variant="outline" color="gray" onClick={openAddFont}>
                <IconPlus size={36} color="white" />
              </Button>
            )}
          </Stack>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default StyleSelector;
