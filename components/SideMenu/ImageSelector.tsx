import { IconPhotoPlus } from "@tabler/icons";
import { ActionIcon, Popover, Text, HoverCard } from "@mantine/core";
import { imageComponent } from "../../shared/commonComponents";
import grapesjs from "grapesjs";
import theme from "../../config/theme";

interface IStyleSelectorProps {
  editor: grapesjs.Editor;
}

const ImageSelector = ({ editor }: IStyleSelectorProps) => {
  const addImageComponent = () => {
    // @ts-ignore
    editor.addComponents(imageComponent, { at: 0 });
  };

  return (
    <>
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
              onClick={() => addImageComponent()}
            >
              <IconPhotoPlus
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
            <Text size="sm">Add Image</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Popover>
    </>
  );
};

export default ImageSelector;
