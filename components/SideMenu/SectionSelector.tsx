import { IconPhotoPlus, IconSection } from "@tabler/icons";
import {
  ActionIcon,
  Popover,
  Stack,
  Text,
  Modal,
  Image,
  HoverCard,
} from "@mantine/core";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { imageComponent } from "../../shared/commonComponents";
import grapesjs from "grapesjs";
import theme from "../../config/theme";
import { getSectionHtml } from "../../grapeJs/blocks";

interface IStyleSelectorProps {
  editor: grapesjs.Editor;
}

const SectionSelector = ({ editor }: IStyleSelectorProps) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const addSectionComponent = () => {
    editor.addComponents(
      getSectionHtml("Heading", 1, [
        {
          title: "Title",
          description: "Description",
          price: "$10",
          addOn: false,
          addOnContent: "Add on",
        },
        {
          title: "Title",
          description: "Description",
          price: "$10",
          addOn: false,
          addOnContent: "Add on",
        },
      ])
    );
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
              onClick={() => addSectionComponent()}
            >
              <IconSection
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
            <Text size="sm">Add Section</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Popover>
    </>
  );
};

export default SectionSelector;
