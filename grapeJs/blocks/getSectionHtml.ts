import { sectionVersion } from "./blockVersions";
import { getMenuItemHtml } from "./getMenuItemHtml";

export const getSectionHtml = (
  heading: string = "Heading",
  sectionColumns: number = 1,
  menuItems: {
    title: string | undefined;
    description: string | undefined;
    price: string | undefined;
    addOn: boolean | undefined;
    addOnContent: string | undefined;
  }[],
  menuItemVariant: number = 1,
  priceLocation?: "top" | "bottom",
  headerAlignment: "left" | "right" | "center" | "vertical" = "left",
  sectionHeaderPrice: string = "10$",
  sectionFooterPrice: string = "10$",
  addOn: boolean = false,
  addOnContent: string = "Add on",
  splitHeader: boolean = false,
  hideHeader: boolean = false
) => {
  const sectionVersionAttr = `data-version="${sectionVersion}"`;

  const disableHighlight = 'data-gjs-highlightable="false"';
  const disableAllInteractions =
    'data-gjs-draggable="false" data-gjs-droppable="false" data-gjs-selectable="false" data-gjs-hoverable="false" ' +
    disableHighlight;

  let html = "";
  let menuItemsHtml = "";

  let rows = "";
  switch (sectionColumns) {
    case 1:
      menuItems.forEach((menuItem) => {
        menuItemsHtml += getMenuItemHtml(
          menuItem.title,
          menuItem.description,
          menuItem.price,
          menuItemVariant,
          menuItem.addOn,
          menuItem.addOnContent
        );
      });
      break;
    default:
      rows = "";
      for (let i = 0; i < Math.ceil(menuItems.length / sectionColumns); i++) {
        let rowItems = "";
        for (let j = 0; j < sectionColumns; j++) {
          if (menuItems[i * sectionColumns + j]) {
            rowItems += `<td ${disableAllInteractions} style="width: ${
              100 / sectionColumns
            }%;">${getMenuItemHtml(
              menuItems[i * sectionColumns + j].title,
              menuItems[i * sectionColumns + j].description,
              menuItems[i * sectionColumns + j].price,
              menuItemVariant,
              menuItems[i * sectionColumns + j].addOn,
              menuItems[i * sectionColumns + j].addOnContent
            )}</td>`;
          } else {
            rowItems += `<td ${disableAllInteractions} style="width: ${
              100 / sectionColumns
            }%;"></td>`;
          }
        }
        rows += `<tr ${disableAllInteractions}>${rowItems}</tr>`;
      }
      menuItemsHtml = `<table ${disableAllInteractions} style="width: 100%; height: 100%;">
        <tbody ${disableAllInteractions}>
            ${rows}
        </tbody>
      </table>`;
  }
  switch (headerAlignment) {
    case "left":
      html = `<div ${sectionVersionAttr} ${disableHighlight} class="section section-column-${sectionColumns} sectionHeader-left ${
        splitHeader ? "sectionHeader-split" : ""
      } ${hideHeader ? "sectionHeader-hide" : ""}">
        <table ${disableAllInteractions}>
          <tbody ${disableAllInteractions}>
            <tr ${disableAllInteractions} style="${
        hideHeader ? "display: none;" : ""
      }">
              <td ${disableAllInteractions}>
                <div ${disableAllInteractions} style='font-size: 28px;'>
                  <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
                  <span ${disableAllInteractions} class="section-header-price" style="display: ${
        priceLocation === "top" ? "" : "none"
      };">${sectionHeaderPrice}</span>
                </div>
              </td>
              <td ${disableAllInteractions} style="width: ${
        splitHeader ? `${100 / sectionColumns}` : "100"
      }%; padding-left: 6px;">
                <div ${disableAllInteractions} class="divider" style="margin: 2px 0px;"></div>                
              </td>
              ${
                splitHeader && sectionColumns >= 2
                  ? `<td ${disableAllInteractions}>
                        <div ${disableAllInteractions} style='font-size: 28px;'>
                          <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
                          <span ${disableAllInteractions} class="section-header-price" style="display: ${
                      priceLocation === "top" ? "" : "none"
                    };">${sectionHeaderPrice}</span>
                        </div>
                      </td>
                      <td ${disableAllInteractions} style="width: ${
                      splitHeader ? `${100 / sectionColumns}` : "100"
                    }%; padding-left: 6px;">
                        <div ${disableAllInteractions} class="divider" style="margin: 2px 0px;"></div>                
                    </td>`
                  : ""
              }
              ${
                splitHeader && sectionColumns >= 3
                  ? `<td ${disableAllInteractions}>
                        <div ${disableAllInteractions} style='font-size: 28px;'>
                          <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
                          <span ${disableAllInteractions} class="section-header-price" style="display: ${
                      priceLocation === "top" ? "" : "none"
                    };">${sectionHeaderPrice}</span>
                        </div>
                      </td>
                      <td ${disableAllInteractions} style="width: ${
                      splitHeader ? `${100 / sectionColumns}` : "100"
                    }%; padding-left: 6px;">
                        <div ${disableAllInteractions} class="divider" style="margin: 2px 0px;"></div>                
                    </td>`
                  : ""
              }
            </tr>
          </tbody>
        </table>
        ${menuItemsHtml}
        <div ${disableAllInteractions} class="align-center section-footer-price" style="display: ${
        priceLocation === "bottom" ? "" : "none"
      };">${sectionFooterPrice}</div>
      <div ${disableAllInteractions} class="align-center section-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
      <div>`;
      break;
    case "center":
      html = `<div ${sectionVersionAttr} ${disableHighlight} class="section section-column-${sectionColumns} sectionHeader-center ${
        splitHeader ? "sectionHeader-split" : ""
      } ${hideHeader ? "sectionHeader-hide" : ""}">
        ${
          splitHeader
            ? `<div ${disableAllInteractions} style="display: inline-block;">`
            : ""
        }
        <div ${disableAllInteractions} class="align-center" style='font-size: 28px; width: ${
        splitHeader ? `${100 / sectionColumns}` : "100"
      }%; ${splitHeader ? "display: inline-block;" : ""} ${
        hideHeader ? "display: none;" : ""
      }'>
          <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
          <span ${disableAllInteractions} class="section-header-price" style="display: ${
        priceLocation === "top" ? "" : "none"
      };">${sectionHeaderPrice}</span>
        </div>
        ${
          splitHeader && sectionColumns >= 2
            ? `<div ${disableAllInteractions} class="align-center" style='font-size: 28px; width: ${
                splitHeader ? `${100 / sectionColumns}` : "100"
              }%; ${splitHeader ? "display: inline-block;" : ""}'>
            <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
            <span ${disableAllInteractions} class="section-header-price" style="display: ${
                priceLocation === "top" ? "" : "none"
              };">${sectionHeaderPrice}</span>
          </div>`
            : ""
        }
        ${
          splitHeader && sectionColumns >= 3
            ? `<div ${disableAllInteractions} class="align-center" style='font-size: 28px; width: ${
                splitHeader ? `${100 / sectionColumns}` : "100"
              }%; ${splitHeader ? "display: inline-block;" : ""}'>
            <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
            <span ${disableAllInteractions} class="section-header-price" style="display: ${
                priceLocation === "top" ? "" : "none"
              };">${sectionHeaderPrice}</span>
          </div>`
            : ""
        }
        ${splitHeader ? "</div>" : ""}
        <div ${disableAllInteractions} class="divider" style="margin: 2px 0px;"></div>
        ${menuItemsHtml}
        <div ${disableAllInteractions} class="align-center section-footer-price" style="display: ${
        priceLocation === "bottom" ? "" : "none"
      };">${sectionFooterPrice}</div>
      <div ${disableAllInteractions} class="align-center section-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
      <div>`;
      break;
    case "right":
      html = `<div ${sectionVersionAttr} ${disableHighlight} class="section section-column-${sectionColumns} sectionHeader-right ${
        splitHeader ? "sectionHeader-split" : ""
      } ${hideHeader ? "sectionHeader-hide" : ""}">
      ${
        splitHeader
          ? `<div ${disableAllInteractions} style="display: inline-block;">`
          : ""
      }
        <div ${disableAllInteractions} class="align-right" style='font-size: 28px; width: ${
        splitHeader ? `${100 / sectionColumns}` : "100"
      }%; ${splitHeader ? "display: inline-block;" : ""} ${
        hideHeader ? "display: none;" : ""
      }'>
          <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
          <span ${disableAllInteractions} class="section-header-price" style="display: ${
        priceLocation === "top" ? "" : "none"
      };">${sectionHeaderPrice}</span>
        </div>
        ${
          splitHeader && sectionColumns >= 2
            ? `<div ${disableAllInteractions} class="align-right" style='font-size: 28px; width: ${
                splitHeader ? `${100 / sectionColumns}` : "100"
              }%; ${splitHeader ? "display: inline-block;" : ""}'>
            <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
            <span ${disableAllInteractions} class="section-header-price" style="display: ${
                priceLocation === "top" ? "" : "none"
              };">${sectionHeaderPrice}</span>
          </div>`
            : ""
        }
        ${
          splitHeader && sectionColumns >= 3
            ? `<div ${disableAllInteractions} class="align-right" style='font-size: 28px; width: ${
                splitHeader ? `${100 / sectionColumns}` : "100"
              }%; ${splitHeader ? "display: inline-block;" : ""}'>
            <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
            <span ${disableAllInteractions} class="section-header-price" style="display: ${
                priceLocation === "top" ? "" : "none"
              };">${sectionHeaderPrice}</span>
          </div>`
            : ""
        }
        ${splitHeader ? "</div>" : ""}
        ${menuItemsHtml}
        <div ${disableAllInteractions} class="align-center section-footer-price" style="display: ${
        priceLocation === "bottom" ? "" : "none"
      };">${sectionFooterPrice}</div>
      <div ${disableAllInteractions} class="align-center section-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
      <div>`;
      break;
    case "vertical":
      html = `<div ${sectionVersionAttr} ${disableHighlight} class="section section-column-${sectionColumns} sectionHeader-vertical ${
        splitHeader ? "sectionHeader-split" : ""
      } ${hideHeader ? "sectionHeader-hide" : ""}">
        <table ${disableAllInteractions}>
          <tbody ${disableAllInteractions}>
            <tr ${disableAllInteractions}>
              <td ${disableAllInteractions}>
                <div ${disableAllInteractions} style='font-size: 28px; writing-mode: vertical-lr; text-orientation: upright;'>
                  <span ${disableAllInteractions} class="section-heading font-title color-primary">${heading}</span>
                  <span ${disableAllInteractions} class="section-header-price" style="display: ${
        priceLocation === "top" ? "" : "none"
      };">${sectionHeaderPrice}</span>
                </div>
              </td>
              <td ${disableAllInteractions} style="width: 100%; padding-left: 6px;">
                <div ${disableAllInteractions} class="divider" style="margin: 2px 0px;"></div>
                ${menuItemsHtml}
                <div ${disableAllInteractions} class="align-center section-footer-price" style="display: ${
        priceLocation === "bottom" ? "" : "none"
      };">${sectionFooterPrice}</div>
      <div ${disableAllInteractions} class="align-center section-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
              </td>
            </tr>
          </tbody>
        </table>
      <div>`;
      break;
  }
  return html;
};
