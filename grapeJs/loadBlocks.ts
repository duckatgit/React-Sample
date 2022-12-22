import grapesjs from "grapesjs";
import { IToolBar } from "../interfaces/IToolBar";
import {
  headerComponent,
  footerComponent,
  IconAlignLeft,
} from "../shared/commonComponents";
import { getMenuItemHtml, getSectionHtml } from "./blocks";

// import { IconSquare,IconAlignLeft } from "@tabler/icons";
export const loadBlocks = (editor: grapesjs.Editor) => {
  // COLOR_CHANGER
  const wrapper = editor.getWrapper()
  let counter = 0

  const colorChange = (rte: any) => {
    const description = wrapper.getEl().children[0].getElementsByClassName('menu-item-description')
    const title = wrapper.getEl().children[0].getElementsByClassName('menu-item-title')
    const price = wrapper.getEl().children[0].getElementsByClassName('menu-item-price')
    const header = wrapper.getEl().children[0].getElementsByClassName('section-heading')
    if (counter === 3) {
      counter = 1
    } else {
      counter = counter + 1
    }

    if (rte.el.classList.contains('menu-item-description')) {
      for (let i = 0; i < description.length; i++) {
        if (counter === 1) {
          description[i].classList.remove("color-primary")
          description[i].classList.add("color-secondary")
        } else if (counter === 2) {
          description[i].classList.remove("color-secondary")
          description[i].classList.add("color-tertiary")
        } else {
          description[i].classList.remove("color-tertiary")
          description[i].classList.add("color-primary")
        }
      }
    }

    if (rte.el.classList.contains('menu-item-title')) {
      for (let i = 0; i < title.length; i++) {
        if (counter === 1) {
          title[i].classList.remove("color-primary")
          title[i].classList.add("color-secondary")
        } else if (counter === 2) {
          title[i].classList.remove("color-secondary")
          title[i].classList.add("color-tertiary")
        } else {
          title[i].classList.remove("color-tertiary")
          title[i].classList.add("color-primary")
        }
      }
    }

    if (rte.el.classList.contains('menu-item-price')) {
      for (let i = 0; i < price.length; i++) {
        if (counter === 1) {
          price[i].classList.remove("color-primary")
          price[i].classList.add("color-secondary")
        } else if (counter === 2) {
          price[i].classList.remove("color-secondary")
          price[i].classList.add("color-tertiary")
        } else {
          price[i].classList.remove("color-tertiary")
          price[i].classList.add("color-primary")
        }
      }
    }

    if (rte.el.classList.contains('section-heading')) {
      for (let i = 0; i < header.length; i++) {
        if (counter === 1) {
          header[i].classList.remove("color-primary")
          header[i].classList.add("color-secondary")
        } else if (counter === 2) {
          header[i].classList.remove("color-secondary")
          header[i].classList.add("color-tertiary")
        } else {
          header[i].classList.remove("color-tertiary")
          header[i].classList.add("color-primary")
        }
      }
    }

  }
  // FONT_CHANGE
  let counterFont = 0
  const fontChange = (rte: any) => {
    const description = wrapper.getEl().children[0].getElementsByClassName('menu-item-description')
    const title = wrapper.getEl().children[0].getElementsByClassName('menu-item-title')
    const price = wrapper.getEl().children[0].getElementsByClassName('menu-item-price')
    const header = wrapper.getEl().children[0].getElementsByClassName('section-heading')
    if (counterFont === 2) {
      counterFont = 1
    } else {
      counterFont = counterFont + 1
    }

    if (rte.el.classList.contains('section-heading')) {
      for (let i = 0; i < header.length; i++) {
        if (counterFont === 1) {
          header[i].classList.remove("font-title")
          header[i].classList.add("font-header")
        } else {
          header[i].classList.remove("font-header")
          header[i].classList.add("font-title")
        }
      }
    }
    if (rte.el.classList.contains('menu-item-description')) {
      for (let i = 0; i < description.length; i++) {
        if (counterFont === 1) {
          description[i].classList.remove("font-title")
          description[i].classList.add("font-header")
        } else {
          description[i].classList.remove("font-header")
          description[i].classList.add("font-title")
        }
      }
    }
    if (rte.el.classList.contains('menu-item-title')) {
      for (let i = 0; i < title.length; i++) {
        if (counterFont === 1) {
          title[i].classList.remove("font-title")
          title[i].classList.add("font-header")
        } else {
          title[i].classList.remove("font-header")
          title[i].classList.add("font-title")
        }
      }
    }
    if (rte.el.classList.contains('menu-item-price')) {
      for (let i = 0; i < price.length; i++) {
        if (counterFont === 1) {
          price[i].classList.remove("font-title")
          price[i].classList.add("font-header")
        } else {
          price[i].classList.remove("font-header")
          price[i].classList.add("font-title")
        }
      }
    }
  }
  const disableHighlight = 'data-gjs-highlightable="false"';
  const disableAllInteractions =
    'data-gjs-draggable="false" data-gjs-selectable="false" data-gjs-hoverable="false"' +
    disableHighlight;

  //Header Block
  editor.BlockManager.getAll().remove("header");
  editor.BlockManager.add("header", {
    label: "Header",
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-card-heading" viewBox="0 0 16 16">
      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
      <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
    </svg>`,
    category: {
      label: "Flapjack",
      //@ts-ignore
      order: -1,
      open: true,
    },
    content: headerComponent,
    attributes: {
      title: "Insert header",
    },
  });

  //Footer Block
  editor.BlockManager.getAll().remove("footer");
  editor.BlockManager.add("footer", {
    label: "Footer",
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-card-heading" viewBox="0 0 16 16">
    <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
    <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
  </svg>`,
    category: {
      label: "Flapjack",
      //@ts-ignore
      order: -1,
      open: true,
    },
    content: footerComponent,
    attributes: {
      title: "Insert footer",
    },
  });

  editor.BlockManager.getAll().remove("image");
  editor.BlockManager.add("image", {
    label: "Image",
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
      <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
    </svg>`,
    content: { type: "image" },
    category: {
      label: "Flapjack",
      //@ts-ignore
      order: -1,
      open: true,
    },
    activate: true,
  });
  editor.BlockManager.getAll().remove("menu-item");
  editor.BlockManager.add("menu-item", {
    label: "Menu Item",
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-justify-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>`,
    content: getMenuItemHtml(),
    category: {
      label: "Flapjack",
      //@ts-ignore
      order: -1,
      open: true,
    },
    attributes: {
      title: "Insert Menu Item",
    },
  });
  editor.BlockManager.getAll().remove("section");
  editor.BlockManager.add("section", {
    label: "Section",
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-justify-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
    </svg>`,
    content: getSectionHtml("Heading", 1, [
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
    ]),
    category: {
      label: "Flapjack",
      //@ts-ignore
      order: -1,
      open: true,
    },
    attributes: {
      title: "Insert Text block",
    },
  });

  editor.BlockManager.get("button").set("category", "Basic");

  // REMOVE TOOLBAR BLUE ICON
  editor.DomComponents.getTypes().forEach((elType) => {
    let { model: oldModel, view: oldView } = elType;
    editor.DomComponents.addType(elType.id, {
      model: oldModel.extend({
        initToolbar() {
          oldModel.prototype.initToolbar.apply(this, arguments);
          const toolbar = this.get("toolbar");
          if (toolbar?.some((item: IToolBar) => item?.command === "tlb-move")) {
            toolbar.splice(0, 1);
          }
          this.set("toolbar", toolbar);
        },
      }),
      view: oldView,
    });
  });

  // RTE
  const rte = editor.RichTextEditor
  editor.RichTextEditor.add("leftAlign", {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30" fill="currentColor" class="bi bi-justify-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>`,
    attributes: { title: "Left Align" },
    result: (rte: any) =>
      rte.insertHTML(`<div style="text-align:left">${rte.selection()}</div>`),
  });

  editor.RichTextEditor.add("rightAlign", {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="30"  fill="currentColor" class="bi bi-justify-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"></path>
</svg>`,
    attributes: { title: "Right Align" },
    result: (rte: any) =>
      rte.insertHTML(`<div style="text-align:right">${rte.selection()}</div>`),
  });
  // Custom RTE COLOR_CHANGER
  rte.add("color", {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-palette" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
  <circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
  <circle cx="12" cy="7.5" r=".5" fill="currentColor" />
  <circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
</svg>`,
    attributes: { title: "Color" },
    result: (rte: any) =>
      colorChange(rte)
  });

  // FONT_CHANGER_RTE
  rte.add("color", {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-fonts" viewBox="0 0 16 16">
    <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479L12.258 3z"/>
  </svg>`,
    attributes: { title: "Color" },
    result: (rte: any) =>
      fontChange(rte)
  });

  editor.BlockManager.getAll().remove("add-on");
  editor.BlockManager.add("add-on", {
    label: "Add On",
    media: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-building-add" viewBox="0 0 16 16">
    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Z"/>
    <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6.5a.5.5 0 0 1-1 0V1H3v14h3v-2.5a.5.5 0 0 1 .5-.5H8v4H3a1 1 0 0 1-1-1V1Z"/>
    <path d="M4.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-6 3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
  </svg>`,
    content: {
      tagName: "table",
      type: "table",
      attributes: { class: "add-on" },
      components: [
        {
          tagName: "tbody",
          type: "tbody",
          components: [
            {
              tagName: "tr",
              type: "row",
              components: [
                {
                  tagName: "td",
                  type: "cell",
                  attributes: { class: "font-header color-primary" },
                  components: ["<div>Item</div>"],
                },
                {
                  tagName: "td",
                  type: "cell",
                  components: ["<div>Price</div>"],
                },
              ],
            },
          ],
        },
      ],
    },
    category: "Basic",
    attributes: {
      title: "Insert Add on",
    },
  });
};
