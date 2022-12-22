import { ActionIcon, Popover, Text, HoverCard } from "@mantine/core";
import theme from "../../config/theme";
import { IconToolsKitchen2 } from "@tabler/icons";
import { getMenuItemHtml, getSectionHtml } from "../../grapeJs/blocks";
import grapesjs from "grapesjs";

interface IStyleSelectorProps {
  editor: grapesjs.Editor;
}

const DishSelector = ({ editor }: IStyleSelectorProps) => {
  const addDishComponent = () => {
    let lastSection;
    const sections = editor
      .getComponents()
      //@ts-ignore
      .models.filter((model: any) => model.getClasses().includes("section"));

    if (sections.length > 0) lastSection = sections[sections.length - 1];
    if (lastSection) {
      const menuItems = lastSection
        .getEl()
        .querySelectorAll(".menu-item") as HTMLElement[];

      const sectionHeading = lastSection
        .getEl()
        .querySelector(".section-heading");
      const sectionHeaderPrice = lastSection
        .getEl()
        .querySelector(".section-header-price");
      const sectionFooterPrice = lastSection
        .getEl()
        .querySelector(".section-footer-price");
      const sectionAddOn = lastSection
        .getEl()
        .querySelector(".section-add-on") as HTMLElement;

      const sectionVariantRegex = lastSection.getEl().className.match(/\d+/);

      const sectionVariant = sectionVariantRegex
        ? parseInt(sectionVariantRegex[0])
        : 1;

      const menuItemsDataArr: {
        title: string | undefined;
        description: string | undefined;
        price: string | undefined;
        addOn: boolean | undefined;
        addOnContent: string | undefined;
      }[] = [];

      menuItems.forEach((menuItem) => {
        const titleElement = menuItem.querySelector(".menu-item-title");
        const descriptionElement = menuItem.querySelector(
          ".menu-item-description"
        );
        const priceElement = menuItem.querySelector(".menu-item-price");
        const addOnElement = menuItem.querySelector(
          ".menu-item-add-on"
        ) as HTMLElement;
        menuItemsDataArr.push({
          title: titleElement?.innerHTML,
          description: descriptionElement?.innerHTML,
          price: priceElement?.innerHTML,
          addOn: window.getComputedStyle(addOnElement).display === "none"
          ? false
          : true,
          addOnContent: addOnElement.innerHTML,
        });
      });

      menuItemsDataArr.push({
        title: "Title",
        description: "Description",
        price: "$10",
        addOn: false,
        addOnContent: "Add on",
      });

      let menuItemVariant = 1;

      if (menuItems[0]) {
        const menuItemVariantRegex = menuItems[0].className.match(/\d+/);

        menuItemVariant = menuItemVariantRegex
          ? parseInt(menuItemVariantRegex[0])
          : 1;
      }

      let priceLocation: "top" | "bottom" | undefined;

      if (menuItemVariant === 6) priceLocation = "top";
      if (menuItemVariant === 7) priceLocation = "bottom";

      let headerAlignment:
        | "left"
        | "right"
        | "center"
        | "vertical"
        | undefined = "left";

      if (lastSection.getEl().classList.contains("sectionHeader-center")) {
        headerAlignment = "center";
      } else if (
        lastSection.getEl().classList.contains("sectionHeader-right")
      ) {
        headerAlignment = "right";
      } else if (
        lastSection.getEl().classList.contains("sectionHeader-vertical")
      ) {
        headerAlignment = "vertical";
      } else {
        headerAlignment = "left";
      }
      lastSection.replaceWith(
        getSectionHtml(
          sectionHeading?.innerHTML,
          sectionVariant,
          menuItemsDataArr,
          menuItemVariant,
          priceLocation,
          headerAlignment,
          sectionHeaderPrice?.innerHTML,
          sectionFooterPrice?.innerHTML,
          window.getComputedStyle(sectionAddOn).display === "none"
            ? false
            : true,
          sectionAddOn.innerHTML,
          lastSection.getClasses().includes("sectionHeader-split"),
          lastSection.getClasses().includes("sectionHeader-hide"),
        )
      );
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
              onClick={addDishComponent}
            >
              <IconToolsKitchen2
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
            <Text size="sm">Add Dish</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Popover>
    </>
  );
};

export default DishSelector;
