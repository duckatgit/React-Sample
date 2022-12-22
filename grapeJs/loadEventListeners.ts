import { IconAlignLeft } from "../shared/commonComponents";
import grapesjs from "grapesjs";
import { getMenuItemHtml, getSectionHtml } from "./blocks";
import { IToolBar } from "../interfaces/IToolBar";
import { showNotification } from "@mantine/notifications";

export const loadEventListeners = (editor: grapesjs.Editor) => {
  let isExtraContent = false;
  editor.on("component:add", (model) => {
    if (
      // @ts-ignore
      editor.getComponents().models.filter((model) => {
        if (model.view?.attr?.class?.includes("header")) return true;
        return false;
      }).length > 1 ||
      // @ts-ignore
      editor.getComponents().models.filter((model) => {
        if (model.view?.attr?.class?.includes("footer")) return true;
        return false;
      }).length > 1
    ) {
      model.destroy();
    }
    if (
      model.getClasses().includes("header") ||
      model.getClasses().includes("footer") ||
      model.getClasses().includes("section") ||
      model.getClasses().includes("menu-item") ||
      model.getName() === "Image"
    ) {
      const editorIframe = document.querySelector(".gjs-frame");
      if (editorIframe) {
        const canvasHeight = parseInt(
          window.getComputedStyle(editorIframe).height.replace("px", "")
        );
        let remainingHeight = canvasHeight;
        let noOfMenuItems = 0;
        let noOfSections = 0;
        //@ts-ignore
        editor.getComponents().models.forEach((model) => {
          if (
            model.getClasses().includes("header") ||
            model.getClasses().includes("footer") ||
            model.getName() === "Image"
          ) {
            remainingHeight -= parseInt(
              window.getComputedStyle(model.getEl()).height.replace("px", "")
            );
          }
          if (model.getClasses().includes("section")) {
            noOfSections++;

            const sectionVariantRegex = model.getEl().className.match(/\d+/);

            const sectionVariant = sectionVariantRegex
              ? parseInt(sectionVariantRegex[0])
              : 1;

            noOfMenuItems += Math.ceil(
              model.getEl().querySelectorAll(".menu-item").length /
              sectionVariant
            );

            if (model.getEl().querySelectorAll(".menu-item").length === 0) {
              remainingHeight -=
                parseInt(
                  window
                    .getComputedStyle(model.getEl().querySelector("table"))
                    .height.replace("px", "")
                ) +
                parseInt(
                  window
                    .getComputedStyle(model.getEl())
                    .paddingTop.replace("px", "")
                ) +
                parseInt(
                  window
                    .getComputedStyle(model.getEl())
                    .paddingBottom.replace("px", "")
                );
            }
          }
        });
        //@ts-ignore
        editor.getComponents().models.forEach((model) => {
          if (model.getClasses().includes("section")) {
            if (noOfSections === 1) {
              model.setStyle({
                height: remainingHeight + "px",
              });
            } else if (noOfSections > 1) {
              const sectionVariantRegex = model.getEl().className.match(/\d+/);

              const sectionVariant = sectionVariantRegex
                ? parseInt(sectionVariantRegex[0])
                : 1;

              if (model.getEl().querySelectorAll(".menu-item").length > 0) {
                model.setStyle({
                  height:
                    (remainingHeight *
                      Math.ceil(
                        model.getEl().querySelectorAll(".menu-item").length /
                        sectionVariant
                      )) /
                    noOfMenuItems +
                    "px",
                });
              } else {
                model.setStyle({
                  height: "",
                });
              }
            }
          }
        });
      }
      const { clientHeight, scrollHeight } = editor.getWrapper().getEl();
      if (scrollHeight > clientHeight) {
        decreaseFontSize(editor);
      }
    }
  });

  editor.on("component:remove", (model) => {
    if (
      model.getClasses().includes("header") ||
      model.getClasses().includes("footer") ||
      model.getClasses().includes("section") ||
      model.getClasses().includes("menu-item") ||
      model.getName() === "Image"
    ) {
      const editorIframe = document.querySelector(".gjs-frame");
      if (editorIframe) {
        const canvasHeight = parseInt(
          window.getComputedStyle(editorIframe).height.replace("px", "")
        );
        let remainingHeight = canvasHeight;
        let noOfMenuItems = 0;
        let noOfSections = 0;
        //@ts-ignore
        editor.getComponents().models.forEach((model) => {
          if (
            model.getClasses().includes("header") ||
            model.getClasses().includes("footer") ||
            model.getName() === "Image"
          ) {
            remainingHeight -= parseInt(
              window.getComputedStyle(model.getEl()).height.replace("px", "")
            );
          }
          if (model.getClasses().includes("section")) {
            noOfSections++;

            const sectionVariantRegex = model.getEl().className.match(/\d+/);

            const sectionVariant = sectionVariantRegex
              ? parseInt(sectionVariantRegex[0])
              : 1;

            noOfMenuItems += Math.ceil(
              model.getEl().querySelectorAll(".menu-item").length /
              sectionVariant
            );

            if (model.getEl().querySelectorAll(".menu-item").length === 0) {
              remainingHeight -=
                parseInt(
                  window
                    .getComputedStyle(model.getEl().querySelector("table"))
                    .height.replace("px", "")
                ) +
                parseInt(
                  window
                    .getComputedStyle(model.getEl())
                    .paddingTop.replace("px", "")
                ) +
                parseInt(
                  window
                    .getComputedStyle(model.getEl())
                    .paddingBottom.replace("px", "")
                );
            }
          }
        });
        //@ts-ignore
        editor.getComponents().models.forEach((model) => {
          if (model.getClasses().includes("section")) {
            if (noOfSections === 1) {
              model.setStyle({
                height: remainingHeight + "px",
              });
            } else if (noOfSections > 1) {
              const sectionVariantRegex = model.getEl().className.match(/\d+/);

              const sectionVariant = sectionVariantRegex
                ? parseInt(sectionVariantRegex[0])
                : 1;

              if (model.getEl().querySelectorAll(".menu-item").length > 0) {
                model.setStyle({
                  height:
                    (remainingHeight *
                      Math.ceil(
                        model.getEl().querySelectorAll(".menu-item").length /
                        sectionVariant
                      )) /
                    noOfMenuItems +
                    "px",
                });
              } else {
                model.setStyle({
                  height: "",
                });
              }
            }
          }
        });
      }
      const { clientHeight, scrollHeight } = editor.getWrapper().getEl();
      if (!(scrollHeight > clientHeight)) {
        increaseFontSize(editor);
      }
    }
  });

  editor.on("canvas:drop", (DataTransfer, model) => {
    if (
      model.view?.el?.className &&
      model.view.el.className.includes("menu-item") &&
      model.view.el.closest(".section")
    ) {
      const component = model.view.el.closest(".section") as HTMLElement;
      const menuItems = component.querySelectorAll(".menu-item");
      let menuItemVariant = 1;
      if (menuItems[0]) {
        const menuItemVariantRegex = menuItems[0].className.match(/\d+/);
        menuItemVariant = menuItemVariantRegex
          ? parseInt(menuItemVariantRegex[0])
          : 1;
      }

      model.replaceWith(
        getMenuItemHtml("Title", "Description", "$10", menuItemVariant)
      );
    }
  });

  editor.on("component:drag:end", (model) => {
    if (model.target.getClasses().includes("menu-item")) {
      const section = model.target.getEl().closest(".section");

      if (section) {
        const sectionModel = editor
          .getComponents()
          //@ts-ignore
          .models.find((model) => model.ccid === section.id);
        if (sectionModel) {
          const menuItems = sectionModel
            .getEl()
            .querySelectorAll(".menu-item") as HTMLElement[];

          const sectionHeading = sectionModel
            .getEl()
            .querySelector(".section-heading");
          const sectionHeaderPrice = sectionModel
            .getEl()
            .querySelector(".section-header-price");
          const sectionFooterPrice = sectionModel
            .getEl()
            .querySelector(".section-footer-price");

          const sectionVariantRegex = sectionModel
            .getEl()
            .className.match(/\d+/);

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
              addOn:
                window.getComputedStyle(addOnElement).display === "none"
                  ? false
                  : true,
              addOnContent: addOnElement.innerHTML,
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

          if (sectionModel.getEl().classList.contains("sectionHeader-center")) {
            headerAlignment = "center";
          } else if (
            sectionModel.getEl().classList.contains("sectionHeader-right")
          ) {
            headerAlignment = "right";
          } else if (
            sectionModel.getEl().classList.contains("sectionHeader-vertical")
          ) {
            headerAlignment = "vertical";
          } else {
            headerAlignment = "left";
          }
          sectionModel.replaceWith(
            getSectionHtml(
              sectionHeading?.innerHTML,
              sectionVariant,
              menuItemsDataArr,
              menuItemVariant,
              priceLocation,
              headerAlignment,
              sectionHeaderPrice?.innerHTML,
              sectionFooterPrice?.innerHTML,
              sectionModel.getClasses().includes("sectionHeader-split"),
              sectionModel.getClasses().includes("sectionHeader-hide")
            )
          );
        }
      }
    }
  });

  editor.on("component:selected", () => {
    const selected = editor.getSelected();
    if (selected) {
      const toolbar = selected.get("toolbar");
      if (toolbar) {
        if (selected.getEl().className.includes("menu-item")) {
          toolbar.unshift({
            id: "menu-item-add-on-toggle",
            command: "menu-item-add-on-toggle",
            label: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.44395 15.4071C6.72366 15.4071 7.00337 15.2473 7.12325 14.9676C7.28308 14.6879 7.24312 14.3682 7.28308 14.0885C7.40296 13.4092 7.64271 12.7699 8.0423 12.1705C8.48184 11.4912 9.08123 10.9318 9.80048 10.5322C10.1601 10.3324 10.3199 9.81291 10.0802 9.45328C9.84044 9.09365 9.36094 8.93382 9.00131 9.17357C7.04333 10.2924 5.76465 12.3703 5.64478 14.608C5.64478 15.0075 6.04436 15.4071 6.44395 15.4071Z" fill="#5C5F66"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5106 11.7989C19.5229 8.76648 16.9607 6.42902 13.7965 5.77735C14.0362 5.41772 14.1561 5.01814 14.1561 4.57859C14.1561 3.37983 13.1571 2.38086 11.9584 2.38086C10.7596 2.38086 9.76065 3.37983 9.76065 4.57859C9.76065 5.01814 9.88053 5.41772 10.1203 5.77735C6.04449 6.61648 2.9679 10.2527 2.9679 14.5683V17.2855H2.12876C1.68922 17.2855 1.32959 17.6451 1.32959 18.0846V21.0416C1.32959 21.4811 1.68922 21.8408 2.12876 21.8408H8.76191H14.1365C13.5914 21.3815 13.1292 20.8269 12.7756 20.2027H4.5651H2.9268V18.8441H2.96676H12.2141C12.0775 18.3473 12.0032 17.8248 12.0001 17.2855H4.56579L4.56556 14.5683C4.56556 10.4925 7.88213 7.17568 11.9582 7.17568C14.8526 7.17568 17.3641 8.84815 18.577 11.2774C19.2616 11.3427 19.9126 11.5231 20.5106 11.7989ZM21.8682 21.8368C22.2444 21.7992 22.546 21.4978 22.5838 21.1217C22.3658 21.3796 22.1263 21.6189 21.8682 21.8368ZM12.5575 4.57836C12.5575 4.25869 12.2778 3.97898 11.9582 3.97898C11.6385 3.97898 11.3588 4.25869 11.3588 4.57836C11.3588 4.89803 11.6385 5.17774 11.9582 5.17774C12.2778 5.17774 12.5575 4.89803 12.5575 4.57836Z" fill="#5C5F66"/>
              <path d="M19.2858 14H17.5716V16.5715H15V18.2858H17.5716V20.8572H19.2858V18.2858H21.8572V16.5715H19.2858V14Z" fill="#5C5F66"/>
              </svg>
              `,
          });
          selected.set("toolbar", toolbar);
        }

        if (selected.getEl().className.includes("section")) {
          toolbar.unshift(
            {
              id: "section-layout-toggle",
              command: "section-layout-toggle",
              label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app" viewBox="0 0 16 16">
              <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
            </svg>`,
            },
            {
              id: "section-menu-item-layout-toggle",
              command: "section-menu-item-layout-toggle",
              label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders2-vertical" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M0 10.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H3V1.5a.5.5 0 0 0-1 0V10H.5a.5.5 0 0 0-.5.5ZM2.5 12a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Zm3-6.5A.5.5 0 0 0 6 6h1.5v8.5a.5.5 0 0 0 1 0V6H10a.5.5 0 0 0 0-1H6a.5.5 0 0 0-.5.5ZM8 1a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2A.5.5 0 0 0 8 1Zm3 9.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1H14V1.5a.5.5 0 0 0-1 0V10h-1.5a.5.5 0 0 0-.5.5Zm2.5 1.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5Z"/>
              </svg>`,
            },
            {
              id: "section-header-align",
              command: "section-header-align",
              label: IconAlignLeft,
            },
            {
              id: "section-add-on-toggle",
              command: "section-add-on-toggle",
              label: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.44395 15.4071C6.72366 15.4071 7.00337 15.2473 7.12325 14.9676C7.28308 14.6879 7.24312 14.3682 7.28308 14.0885C7.40296 13.4092 7.64271 12.7699 8.0423 12.1705C8.48184 11.4912 9.08123 10.9318 9.80048 10.5322C10.1601 10.3324 10.3199 9.81291 10.0802 9.45328C9.84044 9.09365 9.36094 8.93382 9.00131 9.17357C7.04333 10.2924 5.76465 12.3703 5.64478 14.608C5.64478 15.0075 6.04436 15.4071 6.44395 15.4071Z" fill="#5C5F66"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20.5106 11.7989C19.5229 8.76648 16.9607 6.42902 13.7965 5.77735C14.0362 5.41772 14.1561 5.01814 14.1561 4.57859C14.1561 3.37983 13.1571 2.38086 11.9584 2.38086C10.7596 2.38086 9.76065 3.37983 9.76065 4.57859C9.76065 5.01814 9.88053 5.41772 10.1203 5.77735C6.04449 6.61648 2.9679 10.2527 2.9679 14.5683V17.2855H2.12876C1.68922 17.2855 1.32959 17.6451 1.32959 18.0846V21.0416C1.32959 21.4811 1.68922 21.8408 2.12876 21.8408H8.76191H14.1365C13.5914 21.3815 13.1292 20.8269 12.7756 20.2027H4.5651H2.9268V18.8441H2.96676H12.2141C12.0775 18.3473 12.0032 17.8248 12.0001 17.2855H4.56579L4.56556 14.5683C4.56556 10.4925 7.88213 7.17568 11.9582 7.17568C14.8526 7.17568 17.3641 8.84815 18.577 11.2774C19.2616 11.3427 19.9126 11.5231 20.5106 11.7989ZM21.8682 21.8368C22.2444 21.7992 22.546 21.4978 22.5838 21.1217C22.3658 21.3796 22.1263 21.6189 21.8682 21.8368ZM12.5575 4.57836C12.5575 4.25869 12.2778 3.97898 11.9582 3.97898C11.6385 3.97898 11.3588 4.25869 11.3588 4.57836C11.3588 4.89803 11.6385 5.17774 11.9582 5.17774C12.2778 5.17774 12.5575 4.89803 12.5575 4.57836Z" fill="#5C5F66"/>
              <path d="M19.2858 14H17.5716V16.5715H15V18.2858H17.5716V20.8572H19.2858V18.2858H21.8572V16.5715H19.2858V14Z" fill="#5C5F66"/>
              </svg>
              `,
            }
          );
          selected.set("toolbar", toolbar);
        }

        if (selected.getEl().className.includes("footer"))
          toolbar.unshift({
            id: "variant-toggle",
            command: "variant-toggle",
            label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app" viewBox="0 0 16 16">
              <path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/>
            </svg>`,
          });

        if (selected.getEl().className.includes("header")) {
          const subMenusToRemove = ["tlb-move", "tlb-clone"];
          const newToolbar = toolbar
            .filter((item: IToolBar) => {
              return !subMenusToRemove.includes(item?.command as string);
            })
          newToolbar.unshift({
            id: "justify-header-image",
            command: "justify-header-image",
            label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-justify" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>`,
          });

          selected.set("toolbar", newToolbar);
          selected.set("draggable", false);
        }

        if (selected.getEl().tagName.includes("IMG")) {
          toolbar.unshift(
            {
              id: "uploadImg",
              label: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" stroke-width="2" stroke="#5c5f66" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15 8h.01"></path><path d="M12 20h-5a3 3 0 0 1 -3 -3v-10a3 3 0 0 1 3 -3h10a3 3 0 0 1 3 3v5"></path><path d="M4 15l4 -4c.928 -.893 2.072 -.893 3 0l4 4">
            </path><path d="M14 14l1 -1c.617 -.593 1.328 -.793 2.009 -.598"></path>
            <path d="M16 19h6"></path><path d="M19 16v6"></path></svg>`,
              command: (editor: grapesjs.Editor) =>
                editor.runCommand("open-assets", {
                  target: editor.getSelected(),
                }),
            },
            {
              id: "toggleDrag",
              label: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-drag-drop" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M19 11v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
              <path d="M13 13l9 3l-4 2l-2 4l-3 -9" />
              <line x1="3" y1="3" x2="3" y2="3.01" />
              <line x1="7" y1="3" x2="7" y2="3.01" />
              <line x1="11" y1="3" x2="11" y2="3.01" />
              <line x1="15" y1="3" x2="15" y2="3.01" />
              <line x1="3" y1="7" x2="3" y2="7.01" />
              <line x1="3" y1="11" x2="3" y2="11.01" />
              <line x1="3" y1="15" x2="3" y2="15.01" />
            </svg>`,
              command: "toggleDrag",
            },
            {
              id: "fonwardImg",
              label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layer-forward" viewBox="0 0 16 16">
              <path d="M8.354.146a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708l1 1a.5.5 0 0 0 .708 0L7 4.207V12H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H9V4.207l.646.647a.5.5 0 0 0 .708 0l1-1a.5.5 0 0 0 0-.708l-3-3z"/>
              <path d="M1 7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h4.5a.5.5 0 0 0 0-1H1V8h4.5a.5.5 0 0 0 0-1H1zm9.5 0a.5.5 0 0 0 0 1H15v2h-4.5a.5.5 0 0 0 0 1H15a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-4.5z"/>
            </svg>`,
              command: "fonwardImg",
            },
            {
              id: "backwardImg",
              label: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layer-backward" viewBox="0 0 16 16">
              <path d="M8.354 15.854a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708l1-1a.5.5 0 0 1 .708 0l.646.647V4H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9v7.793l.646-.647a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-3 3z"/>
              <path d="M1 9a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4.5a.5.5 0 0 1 0 1H1v2h4.5a.5.5 0 0 1 0 1H1zm9.5 0a.5.5 0 0 1 0-1H15V6h-4.5a.5.5 0 0 1 0-1H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4.5z"/>
            </svg>`,
              command: "backwardImg",
            },
          );
          editor.getSelected()?.set("toolbar", toolbar);
        }
        if (selected.getEl().className.includes("flapjackFooter")) {
          // @ts-ignore
          selected.set({ draggable: false, removable: false, editable: false });
          const commandIndex = toolbar?.findIndex(
            (item: IToolBar) => item?.command === "tlb-delete"
          );
          if (commandIndex) {
            toolbar[commandIndex] = {
              ...toolbar[commandIndex],
              command: "openStripeModal",
            };
          }
        }
      }
    }
  });

  const decreaseFontSize = (editor: grapesjs.Editor) => {
    const fontSize = parseInt(
      window
        .getComputedStyle(editor.getWrapper().getEl())
        .fontSize.replace("px", "")
    );
    if (fontSize > 12) {
      editor.getWrapper().setStyle({
        "font-size": `${fontSize - 1}px`,
      });
      const { clientHeight, scrollHeight } = editor.getWrapper().getEl();
      if (scrollHeight > clientHeight) {
        decreaseFontSize(editor);
      }
    } else {
      if (!isExtraContent) {
        isExtraContent = true;
        showNotification({
          color: "red",
          title: "Extra Content",
          message: "Please reduce content from the page",
        });
      }
    }
  };

  const increaseFontSize = (editor: grapesjs.Editor) => {
    const fontSize = parseInt(
      window
        .getComputedStyle(editor.getWrapper().getEl())
        .fontSize.replace("px", "")
    );
    if (fontSize < 16) {
      editor.getWrapper().setStyle({
        "font-size": `${fontSize + 1}px`,
      });
      const { clientHeight, scrollHeight } = editor.getWrapper().getEl();
      if (scrollHeight > clientHeight) {
        decreaseFontSize(editor);
      } else {
        isExtraContent = false;
        increaseFontSize(editor);
      }
    }
  };
};
