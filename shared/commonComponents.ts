import { footerVersion, headerVersion } from "../grapeJs/blocks";

export const headerComponent = {
  tagName: "div",
  attributes: {
    class: "header header-image-left",
    "data-version": headerVersion,
  },
  components: [
    {
      type: "image",
      attributes: { src: "https://path/image" },
    },
  ],
};

export const footerComponent = {
  tagName: "div",
  attributes: {
    class: "footer background-primary",
    "data-version": footerVersion,
  },
  components: [
    {
      type: "text",
      content: "Here is some default footer text",
      class: "new",
      attributes: {
        "data-gjs-highlightable": null,
      },
    },
    {
      type: "text",
      attributes: { class: "flapjackFooter", "data-gjs-highlightable": null },
      content: "made with &#10084; by flapjack",
    },
  ],
};

export const IconAlignLeft = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-align-left" width="18" height="18" viewBox="0 0 24 24" stroke-width="1.5" stroke="#5c5f66" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <line x1="4" y1="6" x2="20" y2="6" />
  <line x1="4" y1="12" x2="14" y2="12" />
  <line x1="4" y1="18" x2="18" y2="18" />
</svg>`;

export const imageComponent = { type: "image"};
