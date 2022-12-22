import { useState, useEffect, useCallback } from "react";
import {
  ActionIcon,
  Popover,
  Text,
  Modal,
  SimpleGrid,
  HoverCard,
} from "@mantine/core";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { IconTemplate } from "@tabler/icons";
import TemplateCard from "../TemplateGallery/TemplateCard";
import { ITemplateDetails } from "../../interfaces/ITemplate";
import theme from "../../config/theme";

interface IStyleSelectorProps {}

const TemplateSelector = (editor: any) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [temData, setTemData] = useState<ITemplateDetails[]>([]);
  const supabase = useSupabaseClient();

  const fetchTemplates = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("templates").select("*");
      if (error) throw error;
      setTemData(data);
    } catch (err) {
      console.error(err);
    }
  }, [supabase]);

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);
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
              onClick={() => setOpened(true)}
              className="menu-bar-button"
            >
              <IconTemplate
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
            <Text size="sm">Templates</Text>
          </HoverCard.Dropdown>
        </HoverCard>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Change Template"
          size="55%"
        >
          <SimpleGrid cols={3}>
            {temData &&
              temData.map((template: ITemplateDetails, i: number) => (
                <div key={i} onClick={() => setOpened(false)}>
                  <TemplateCard key={i} template={template} />
                </div>
              ))}
          </SimpleGrid>
        </Modal>
      </Popover>
    </>
  );
};

export default TemplateSelector;
