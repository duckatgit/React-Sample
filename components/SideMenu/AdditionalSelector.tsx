import { ActionIcon, Popover, Button, Text, HoverCard } from "@mantine/core";
import { IconDots, IconSection } from "@tabler/icons";
import {
  headerComponent,
  footerComponent,
} from "../../shared/commonComponents";
import theme from "../../config/theme";
import { getSectionHtml } from "../../grapeJs/blocks";
import grapejs from "grapesjs";

interface IStyleSelectorProps {
  editor: grapejs.Editor;
}

const AdditionalSelector = ({ editor }: IStyleSelectorProps) => {
  const addSection = (sections: string) => {
    if (sections === "dish") {
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
    }
    if (sections === "header") {
      // @ts-ignore
      editor.addComponents(headerComponent, { at: 0 });
    }
    if (sections === "footer") {
      editor.addComponents(footerComponent);
    }
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
        <Popover.Target>
          <div>
            <HoverCard shadow="md" position="right">
              <HoverCard.Target>
                <ActionIcon
                  variant="subtle"
                  color={theme.colors.blue[6]}
                  sx={{
                    width: 48,
                  }}
                  className="menu-bar-button"
                >
                  <IconDots
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
                <Text size="sm">Additional Section</Text>
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
          <Text size="lg" fw={700} color="white">
            Insert Section
          </Text>
          <Button
            variant="outline"
            fullWidth
            leftIcon={"ICO"}
            className="sectionBtn"
            styles={(theme) => ({
              root: {
                border: 0,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                color: "#fff",
                backgroundColor: "#2f2f2f",
                marginBottom: "8px",
              },
              leftIcon: {
                marginRight: 15,
                backgroundColor: "#575757",
                padding: "8px",
                borderRadius: "5px",
              },
            })}
            onClick={() => addSection("header")}
          >
            Add Header
          </Button>
          <Button
            variant="outline"
            fullWidth
            leftIcon={"ICO"}
            className="sectionBtn"
            styles={(theme) => ({
              root: {
                border: 0,
                height: 50,
                paddingLeft: 20,
                paddingRight: 20,
                color: "#fff",
                backgroundColor: "#2f2f2f",
                marginBottom: "8px",
              },

              leftIcon: {
                marginRight: 15,
                backgroundColor: "#575757",
                padding: "8px",
                borderRadius: "5px",
              },
            })}
            onClick={() => addSection("footer")}
          >
            Add Footer
          </Button>
        </Popover.Dropdown>
      </Popover>
    </>
  );
};

export default AdditionalSelector;
