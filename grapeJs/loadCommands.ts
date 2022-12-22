import grapesjs from "grapesjs";
import { getMenuItemHtml, getSectionHtml } from "./blocks";
import { SupabaseClient } from "@supabase/supabase-js";
import { IUserDetails } from "../interfaces";

export const loadCommands = (
  editor: grapesjs.Editor,
  user: IUserDetails | null,
  openSubscribeModal: () => void
) => {
  editor.Commands.add("section-layout-toggle", {
    run(editor, sender) {
      let selected = editor.getSelected();
      if (selected) {
        if (selected.getClasses().includes("section")) {
          const sectionHeading = selected
            .getEl()
            .querySelector(".section-heading");
          const sectionHeaderPrice = selected
            .getEl()
            .querySelector(".section-header-price");
          const sectionFooterPrice = selected
            .getEl()
            .querySelector(".section-footer-price");
          const sectionAddOn = selected
            .getEl()
            .querySelector(".section-add-on") as HTMLElement;

          const menuItems = selected.getEl().querySelectorAll(".menu-item");
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
              addOn:
                window.getComputedStyle(addOnElement).display === "none"
                  ? false
                  : true,
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
            | "column"
            | "vertical"
            | undefined = "left";

          if (selected.getEl().classList.contains("sectionHeader-center")) {
            headerAlignment = "center";
          } else if (
            selected.getEl().classList.contains("sectionHeader-right")
          ) {
            headerAlignment = "right";
          } else if (
            selected.getEl().classList.contains("sectionHeader-vertical")
          ) {
            headerAlignment = "vertical";
          } else {
            headerAlignment = "left";
          }
          if (selected.getClasses().includes("section-column-1")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                2,
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
                false,
                false
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getClasses().includes("section-column-2")) {
            if (selected.getClasses().includes("sectionHeader-split")) {
              const component = selected.replaceWith(
                getSectionHtml(
                  sectionHeading?.innerHTML || "Heading",
                  2,
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
                  false,
                  true
                )
              );
              editor.select(component as grapesjs.Component);
              selected = component as grapesjs.Component;
            } else if (selected.getClasses().includes("sectionHeader-hide")) {
              const component = selected.replaceWith(
                getSectionHtml(
                  sectionHeading?.innerHTML || "Heading",
                  3,
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
                  false,
                  false
                )
              );
              editor.select(component as grapesjs.Component);
              selected = component as grapesjs.Component;
            } else {
              const component = selected.replaceWith(
                getSectionHtml(
                  sectionHeading?.innerHTML || "Heading",
                  2,
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
                  true,
                  false
                )
              );
              editor.select(component as grapesjs.Component);
              selected = component as grapesjs.Component;
            }
          } else if (selected.getClasses().includes("section-column-3")) {
            if (selected.getClasses().includes("sectionHeader-split")) {
              const component = selected.replaceWith(
                getSectionHtml(
                  sectionHeading?.innerHTML || "Heading",
                  3,
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
                  false,
                  true
                )
              );
              editor.select(component as grapesjs.Component);
              selected = component as grapesjs.Component;
            } else if (selected.getClasses().includes("sectionHeader-hide")) {
              const component = selected.replaceWith(
                getSectionHtml(
                  sectionHeading?.innerHTML || "Heading",
                  1,
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
                  false,
                  false
                )
              );
              editor.select(component as grapesjs.Component);
              selected = component as grapesjs.Component;
            } else {
              const component = selected.replaceWith(
                getSectionHtml(
                  sectionHeading?.innerHTML || "Heading",
                  3,
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
                  true,
                  false
                )
              );
              editor.select(component as grapesjs.Component);
              selected = component as grapesjs.Component;
            }
          }
        }
      }
    },
  });
  editor.Commands.add("section-menu-item-layout-toggle", {
    run(editor, sender) {
      let selected = editor.getSelected();
      if (selected) {
        if (selected.getClasses().includes("section")) {
          const sectionHeading = selected
            .getEl()
            .querySelector(".section-heading");
          const sectionHeaderPrice = selected
            .getEl()
            .querySelector(".section-header-price");
          const sectionFooterPrice = selected
            .getEl()
            .querySelector(".section-footer-price");
          const sectionAddOn = selected
            .getEl()
            .querySelector(".section-add-on") as HTMLElement;

          const menuItems = selected.getEl().querySelectorAll(".menu-item");
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
              addOn:
                window.getComputedStyle(addOnElement).display === "none"
                  ? false
                  : true,
              addOnContent: addOnElement?.innerHTML,
            });
          });

          const sectionVariantRegex = selected.getEl().className.match(/\d+/);

          const sectionVariant = sectionVariantRegex
            ? parseInt(sectionVariantRegex[0])
            : 1;

          let headerAlignment:
            | "left"
            | "right"
            | "center"
            | "column"
            | "vertical"
            | undefined = "left";

          if (selected.getEl().classList.contains("sectionHeader-center")) {
            headerAlignment = "center";
          } else if (
            selected.getEl().classList.contains("sectionHeader-right")
          ) {
            headerAlignment = "right";
          } else if (
            selected.getEl().classList.contains("sectionHeader-vertical")
          ) {
            headerAlignment = "vertical";
          } else {
            headerAlignment = "left";
          }

          if (selected.getEl().querySelector(".menu-item-1")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                2,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-2")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                3,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-3")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                4,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-4")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                5,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-5")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                6,
                "top",
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-6")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                7,
                "bottom",
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-7")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                8,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-8")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                9,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-9")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                10,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-10")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                11,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().querySelector(".menu-item-11")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                1,
                undefined,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          }
        }
      }
    },
  });
  editor.Commands.add("section-header-align", {
    run(editor, sender) {
      let selected = editor.getSelected();
      if (selected) {
        if (selected.getEl().className.includes("section")) {
          const sectionHeading = selected
            .getEl()
            .querySelector(".section-heading");
          const sectionHeaderPrice = selected
            .getEl()
            .querySelector(".section-header-price");
          const sectionFooterPrice = selected
            .getEl()
            .querySelector(".section-footer-price");
          const sectionAddOn = selected
            .getEl()
            .querySelector(".section-add-on") as HTMLElement;

          const menuItems = selected.getEl().querySelectorAll(".menu-item");
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
              addOn:
                window.getComputedStyle(addOnElement).display === "none"
                  ? false
                  : true,
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

          const sectionVariantRegex = selected.getEl().className.match(/\d+/);

          const sectionVariant = sectionVariantRegex
            ? parseInt(sectionVariantRegex[0])
            : 1;

          let priceLocation: "top" | "bottom" | undefined;

          if (menuItemVariant === 6) priceLocation = "top";
          if (menuItemVariant === 7) priceLocation = "bottom";

          if (selected.getEl().className.includes("sectionHeader-left")) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                menuItemVariant,
                priceLocation,
                "center",
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (
            selected.getEl().className.includes("sectionHeader-center")
          ) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                menuItemVariant,
                priceLocation,
                "right",
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (
            selected.getEl().className.includes("sectionHeader-right")
          ) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                menuItemVariant,
                priceLocation,
                "vertical",
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (
            selected.getEl().className.includes("sectionHeader-vertical")
          ) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                menuItemVariant,
                priceLocation,
                "left",
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                window.getComputedStyle(sectionAddOn).display === "none"
                  ? false
                  : true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          }
        }
      }
    },
  });
  editor.Commands.add("section-add-on-toggle", {
    run(editor, sender) {
      let selected = editor.getSelected();
      if (selected) {
        if (selected.getClasses().includes("section")) {
          const sectionHeading = selected
            .getEl()
            .querySelector(".section-heading");
          const sectionHeaderPrice = selected
            .getEl()
            .querySelector(".section-header-price");
          const sectionFooterPrice = selected
            .getEl()
            .querySelector(".section-footer-price");
          const sectionAddOn = selected
            .getEl()
            .querySelector(".section-add-on");

          const menuItems = selected.getEl().querySelectorAll(".menu-item");
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
              addOn:
                window.getComputedStyle(addOnElement).display === "none"
                  ? false
                  : true,
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

          const sectionVariantRegex = selected.getEl().className.match(/\d+/);

          const sectionVariant = sectionVariantRegex
            ? parseInt(sectionVariantRegex[0])
            : 1;

          let headerAlignment:
            | "left"
            | "right"
            | "center"
            | "vertical"
            | undefined = "left";

          if (selected.getEl().classList.contains("sectionHeader-center")) {
            headerAlignment = "center";
          } else if (
            selected.getEl().classList.contains("sectionHeader-right")
          ) {
            headerAlignment = "right";
          } else if (
            selected.getEl().classList.contains("sectionHeader-vertical")
          ) {
            headerAlignment = "vertical";
          } else {
            headerAlignment = "left";
          }

          let priceLocation: "top" | "bottom" | undefined;

          if (menuItemVariant === 6) priceLocation = "top";
          if (menuItemVariant === 7) priceLocation = "bottom";

          if (
            sectionAddOn &&
            window.getComputedStyle(sectionAddOn).display === "none"
          ) {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                menuItemVariant,
                priceLocation,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                true,
                sectionAddOn.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else {
            const component = selected.replaceWith(
              getSectionHtml(
                sectionHeading?.innerHTML || "Heading",
                sectionVariant,
                menuItemsDataArr,
                menuItemVariant,
                priceLocation,
                headerAlignment,
                sectionHeaderPrice?.innerHTML,
                sectionFooterPrice?.innerHTML,
                false,
                sectionAddOn?.innerHTML,
                selected.getClasses().includes("sectionHeader-split"),
                selected.getClasses().includes("sectionHeader-hide")
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          }
        }
      }
    },
  });

  editor.Commands.add("variant-toggle", {
    run(editor, sender) {
      const selected = editor.getSelected();
      if (selected) {
        console.log(selected.get("classes"));
        if (selected.getEl().className.includes("primary")) {
          selected.removeClass("background-primary");
          selected.addClass("background-secondary");
        } else if (selected.getEl().className.includes("secondary")) {
          selected.removeClass("background-secondary");
          selected.addClass("background-tertiary");
        } else if (selected.getEl().className.includes("tertiary")) {
          selected.removeClass("background-tertiary");
          selected.addClass("background-primary");
        }
      }
    },
  });

  editor.Commands.add("menu-item-layout-toggle", {
    run(editor, sender) {
      let selected = editor.getSelected();
      if (selected) {
        if (selected.getEl().className.includes("menu-item")) {
          const titleElement = selected
            .getEl()
            .querySelector(".menu-item-title");
          const descriptionElement = selected
            .getEl()
            .querySelector(".menu-item-description");
          const priceElement = selected
            .getEl()
            .querySelector(".menu-item-price");

          if (selected.getEl().className.includes("menu-item-1")) {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                2
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().className.includes("menu-item-2")) {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                3
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().className.includes("menu-item-3")) {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                4
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().className.includes("menu-item-4")) {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                5
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().className.includes("menu-item-5")) {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                6
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().className.includes("menu-item-6")) {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                7
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else if (selected.getEl().className.includes("menu-item-7")) {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                1
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          }
        }
      }
    },
  });
  editor.Commands.add("menu-item-add-on-toggle", {
    run(editor, sender) {
      let selected = editor.getSelected();
      if (selected) {
        if (selected.getClasses().includes("menu-item")) {
          const titleElement = selected
            .getEl()
            .querySelector(".menu-item-title");
          const descriptionElement = selected
            .getEl()
            .querySelector(".menu-item-description");
          const priceElement = selected
            .getEl()
            .querySelector(".menu-item-price");
          const addOn = selected
            .getEl()
            .querySelector(".menu-item-add-on") as HTMLElement;

          const menuItemVariantRegex = selected.getEl().className.match(/\d+/);

          const menuItemVariant = menuItemVariantRegex
            ? parseInt(menuItemVariantRegex[0])
            : 1;

          if (window.getComputedStyle(addOn).display === "none") {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                menuItemVariant,
                true,
                addOn.innerHTML
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          } else {
            const component = selected.replaceWith(
              getMenuItemHtml(
                titleElement?.innerHTML,
                descriptionElement?.innerHTML,
                priceElement?.innerHTML,
                menuItemVariant,
                false,
                addOn.innerHTML
              )
            );
            editor.select(component as grapesjs.Component);
            selected = component as grapesjs.Component;
          }
        }
      }
    },
  });

  editor.Commands.add("justify-header-image", {
    run(editor, sender) {
      const selected = editor.getSelected();
      if (selected) {
        if (selected.getEl().className.includes("header-image-left")) {
          selected.removeClass("header-image-left");
          selected.addClass("header-image-center");
        } else if (selected.getEl().className.includes("header-image-center")) {
          selected.removeClass("header-image-center");
          selected.addClass("header-image-right");
        } else if (selected.getEl().className.includes("header-image-right")) {
          selected.removeClass("header-image-right");
          selected.addClass("header-image-left");
        }
      }
    },
  });

  editor.Commands.add("textAlign", {
    run(editor, sender) {
      const selected = editor.getSelected();
      if (selected) {
        switch (selected.getStyle()["text-align"] || 0) {
          case "center":
            selected.setStyle({
              ...selected.getStyle(),
              "text-align": "right",
            });
            break;
          case "right":
            selected.setStyle({
              ...selected.getStyle(),
              "text-align": "left",
            });
            break;
          case "left":
            selected.setStyle({
              ...selected.getStyle(),
              "text-align": "center",
            });
            break;
          case 0:
            selected.setStyle({
              ...selected.getStyle(),
              "text-align": "center",
            });
        }
      }
    },
  });

  // IMAGE DRAG & DROP
  editor.Commands.add("toggleDrag", {
    run(editor, sender) {
      const selected = editor.getSelected();
      // @ts-ignore
      if (selected?.getChangedProps().dmode === "absolute") {
        selected?.set("dmode", "");
      } else {
        selected?.set("dmode", "absolute");
      }
    },
  });

  // STRIPE CHECKOUT
  editor.Commands.add("openStripeModal", {
    async run(editor, sender) {
      if (user && user.subscriptionActive) {
        const selected = editor.getSelected();
        if (selected?.getEl().className.includes("flapjackFooter")) {
          // @ts-ignore
          const coll = selected.collection;
          coll.remove(selected);
        }
      } else {
        openSubscribeModal();
      }
    },
  });

  // FORWARD IMAGE
  editor.Commands.add("fonwardImg", {
    async run(editor, sender) {
      let allChildren = editor.getWrapper().getEl().children
      for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i].tagName === 'DIV' && !allChildren[i].className.includes('footer')) {
          console.log(allChildren[i]);

          // @ts-ignore
          allChildren[i].style = "position:relative; z-index:5";
        }
      }
    },
  });

  editor.Commands.add("backwardImg", {
    async run(editor, sender) {
      let allChildren = editor.getWrapper().getEl().children
      for (let i = 0; i < allChildren.length; i++) {
        if (allChildren[i].tagName === 'DIV' &&  !allChildren[i].className.includes('footer')) {
          // @ts-ignore
          allChildren[i].style = "position:unset;";
        }
      }
    },
  });

};
