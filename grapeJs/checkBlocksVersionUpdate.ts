import grapesjs from "grapesjs";
import { headerComponent } from "../shared/commonComponents";
import {
  footerVersion,
  getSectionHtml,
  headerVersion,
  menuItemVersion,
  sectionVersion,
} from "./blocks";

export const checkBlocksVersionUpdate = (editor: grapesjs.Editor) => {
  editor
    .getComponents()
    //@ts-ignore
    .models.forEach((model: any) => {
      if (model.getClasses().includes("section")) {
        const version = model.getEl().getAttribute("data-version");

        const menuItems = model
          .getEl()
          .querySelectorAll(".menu-item") as HTMLElement[];

        let menuItemVersionMismatch = Array.from(menuItems).some((menuItem) => {
          const version = menuItem.getAttribute("data-version");
          if (version && menuItemVersion !== parseFloat(version)) return true;
          return false;
        });

        if (version || menuItemVersionMismatch) {
          if (
            sectionVersion !== parseFloat(version) ||
            menuItemVersionMismatch
          ) {
            const sectionHeading = model
              .getEl()
              .querySelector(".section-heading");
            const sectionHeaderPrice = model
              .getEl()
              .querySelector(".section-header-price");
            const sectionFooterPrice = model
              .getEl()
              .querySelector(".section-footer-price");
              const sectionAddOn = model
                .getEl()
                .querySelector(".section-add-on") as HTMLElement;

            const sectionVariantRegex = model.getEl().className.match(/\d+/);

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
                addOn: addOnElement?.style.display === "none" ? false : true,
                addOnContent: addOnElement?.innerHTML,
              });
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

            if (model.getEl().classList.contains("sectionHeader-center")) {
              headerAlignment = "center";
            } else if (
              model.getEl().classList.contains("sectionHeader-right")
            ) {
              headerAlignment = "right";
            } else if (
              model.getEl().classList.contains("sectionHeader-vertical")
            ) {
              headerAlignment = "vertical";
            } else {
              headerAlignment = "left";
            }
            model.replaceWith(
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
                model.getClasses().includes("sectionHeader-split"),
                model.getClasses().includes("sectionHeader-hide"),
              )
            );
          }
        }
      }
      if (model.getClasses().includes("header")) {
        const version = model.getEl().getAttribute("data-version");
        if (headerVersion !== parseFloat(version)) {
          model.replaceWith(headerComponent);
        }
      }
      if (model.getClasses().includes("footer")) {
        const version = model.getEl().getAttribute("data-version");
        if (footerVersion !== parseFloat(version)) {
          model.replaceWith(headerComponent);
        }
      }
    });
};
