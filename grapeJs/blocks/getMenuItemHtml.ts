import { menuItemVersion } from "./blockVersions";

export const getMenuItemHtml = (
  title: string = "Title",
  description: string = "Description",
  price: string = "$10",
  variant: number = 1,
  addOn: boolean = false,
  addOnContent: string = "Add on"
): string => {
  let html = "";

  const menuItemVersionAttr = `data-version="${menuItemVersion}"`;

  const disableHighlight =
    'data-gjs-draggable=".section" data-gjs-highlightable="false"';
  const disableAllInteractions =
    'data-gjs-droppable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-draggable="false" data-gjs-highlightable="false"';

  switch (variant) {
    case 1:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-1" style="padding: 0px;">
        <tbody ${disableAllInteractions}>
            <tr ${disableAllInteractions}>
                <td ${disableAllInteractions}>
                    <div ${disableAllInteractions} class="menu-item-title font-header" style="display: inline-block;">${title}</div>
                    <div ${disableAllInteractions} class="menu-item-price" style="display: inline-block;">${price}</div>
                </td>
            </tr>
            <tr ${disableAllInteractions}>
                <td ${disableAllInteractions}>
                    <div ${disableAllInteractions} class="menu-item-description">${description}</div>
                </td>
            </tr>
            <tr ${disableAllInteractions}>
                <td ${disableAllInteractions}>
                    <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                </td>
            </tr>
        </tbody>
      </table>`;
      break;
    case 2:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-2" style="padding: 0px;">
          <tbody ${disableAllInteractions}>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-title font-header" style="display: inline-block; width: 80%;">${title}</div>
                      <div ${disableAllInteractions} class="menu-item-price align-right" style="display: inline-block; width: 20%;">${price}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-description">${description}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                  </td>
              </tr>
          </tbody>
        </table>`;
      break;
    case 3:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-3" style="padding: 0px;">
          <tbody ${disableAllInteractions}>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-title font-header">${title}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-description" style="display: inline-block;">${description}</div>
                      <div ${disableAllInteractions} class="menu-item-price" style="display: inline-block;">${price}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                  </td>
              </tr>
          </tbody>
        </table>`;
      break;
    case 4:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-4" style="padding: 0px;">
            <tbody ${disableAllInteractions}>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-title font-header">${title}</div>
                    </td>
                </tr>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-description" style="display: inline-block; width: 80%;">${description}</div>
                        <div ${disableAllInteractions} class="menu-item-price align-right" style="display: inline-block; width: 20%;">${price}</div>
                    </td>
                </tr>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                    </td>
                </tr>
            </tbody>
          </table>`;
      break;
    case 5:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-5" style="padding: 0px;">
          <tbody ${disableAllInteractions}>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-title font-header">${title}</div>
                  </td>
                  <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-price align-right">${price}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-description">${description}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                  </td>
              </tr>
          </tbody>
        </table>`;
      break;
    case 6:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-6" style="padding: 0px;">
            <tbody ${disableAllInteractions}>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-title font-header">${title}</div>
                        <div ${disableAllInteractions} class="menu-item-price" style="display: none;">${price}</div>
                    </td>
                </tr>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-description">${description}</div>
                    </td>
                </tr>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                    </td>
                </tr>
            </tbody>
          </table>`;
      break;
    case 7:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-7" style="padding: 0px;">
              <tbody ${disableAllInteractions}>
                  <tr ${disableAllInteractions}>
                      <td ${disableAllInteractions}>
                          <div ${disableAllInteractions} class="menu-item-title font-header" style="display: inline-block;">${title}</div>
                          <div ${disableAllInteractions} class="menu-item-description" style="display: inline-block;">${description}</div>
                          <div ${disableAllInteractions} class="menu-item-price" style="display: none;">${price}</div>
                      </td>
                  </tr>
                  <tr ${disableAllInteractions}>
                      <td ${disableAllInteractions}>
                          <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                      </td>
                  </tr>
              </tbody>
            </table>`;
      break;
    case 8:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-8" style="padding: 0px;">
                <tbody ${disableAllInteractions}>
                    <tr ${disableAllInteractions}>
                        <td ${disableAllInteractions}>
                            <div ${disableAllInteractions} class="menu-item-title font-header" style="display: inline-block;">${title}</div>
                            <div ${disableAllInteractions} class="menu-item-description" style="display: inline-block;">${description}</div>
                            <div ${disableAllInteractions} class="menu-item-price" style="display: inline-block;">${price}</div>
                        </td>
                    </tr>
                    <tr ${disableAllInteractions}>
                        <td ${disableAllInteractions}>
                            <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                        </td>
                    </tr>
                </tbody>
              </table>`;
      break;
    case 9:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-9 align-center" style="padding: 0px;">
          <tbody ${disableAllInteractions}>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-title font-header" style="display: inline-block;">${title}</div>
                      <div ${disableAllInteractions} class="menu-item-price" style="display: inline-block;">${price}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-description">${description}</div>
                  </td>
              </tr>
              <tr ${disableAllInteractions}>
                  <td ${disableAllInteractions}>
                      <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                  </td>
              </tr>
          </tbody>
        </table>`;
      break;
    case 10:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-10 align-center" style="padding: 0px;">
            <tbody ${disableAllInteractions}>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-title font-header">${title}</div>
                    </td>
                </tr>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-description" style="display: inline-block;">${description}</div>
                        <div ${disableAllInteractions} class="menu-item-price" style="display: inline-block;">${price}</div>
                    </td>
                </tr>
                <tr ${disableAllInteractions}>
                    <td ${disableAllInteractions}>
                        <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                    </td>
                </tr>
            </tbody>
          </table>`;
      break;
    case 11:
      html = `<table ${menuItemVersionAttr} ${disableHighlight} class="menu-item menu-item-11 align-center" style="padding: 0px;">
              <tbody ${disableAllInteractions}>
                  <tr ${disableAllInteractions}>
                      <td ${disableAllInteractions}>
                          <div ${disableAllInteractions} class="menu-item-title font-header">${title}</div>
                      </td>
                  </tr>
                  <tr ${disableAllInteractions}>
                      <td ${disableAllInteractions}>
                          <div ${disableAllInteractions} class="menu-item-description" style="display: inline-block;">${description}</div>
                      </td>
                  </tr>
                  <tr ${disableAllInteractions}>
                      <td ${disableAllInteractions}>
                          <div ${disableAllInteractions} class="menu-item-price" style="display: inline-block;">${price}</div>
                      </td>
                  </tr>
                  <tr ${disableAllInteractions}>
                      <td ${disableAllInteractions}>
                          <div ${disableAllInteractions} class="menu-item-add-on" style="display: ${
        addOn ? "" : "none"
      };">${addOnContent}</div>
                      </td>
                  </tr>
              </tbody>
            </table>`;
      break;
  }
  return html;
};
