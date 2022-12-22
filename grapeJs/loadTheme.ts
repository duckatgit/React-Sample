import { SupabaseClient } from "@supabase/supabase-js";
import grapesjs from "grapesjs";
import { IFont, IPalette } from "../interfaces";

export const loadTheme = (
  editor: grapesjs.Editor,
  selectedPalette: IPalette | null,
  selectedFont: IFont | null,
  supabase: SupabaseClient
) => {
  editor.Css.setRule('div[data-gjs-type="wrapper"]', {
    overflow: "auto",
  });
  editor.Css.setRule("body", {
    ...(selectedPalette && {
      color: selectedPalette.textColor,
      "background-color": selectedPalette.backgroundColor,
    }),
    ...(selectedFont && {
      "font-family": selectedFont.bodyFont.name.replace(/\.[^/.]+$/, ""),
    }),
  });
  editor.Css.setRule(".align-left", {
    "text-align": "left",
  });
  editor.Css.setRule(".align-center", {
    "text-align": "center",
  });
  editor.Css.setRule(".align-right", {
    "text-align": "right",
  });
  editor.Css.setRule(".divider", {
    "background-color": "black",
    height: "2px",
  });
  if (selectedPalette) {
    editor.Css.setRule(".background-primary", {
      "background-color": selectedPalette.primaryColor,
    });
    editor.Css.setRule(".background-secondary", {
      "background-color": selectedPalette.secondaryColor,
    });
    editor.Css.setRule(".background-tertiary", {
      "background-color": selectedPalette.tertiaryColor,
    });
    editor.Css.setRule(".color-primary", {
      color: selectedPalette.primaryColor,
    });
    editor.Css.setRule(".color-secondary", {
      color: selectedPalette.secondaryColor,
    });
    editor.Css.setRule(".color-tertiary", {
      color: selectedPalette.tertiaryColor,
    });
    editor.Css.setRule(".color-background", {
      color: selectedPalette.backgroundColor,
    });
    editor.Css.setRule(".divider", {
      "background-color": selectedPalette.textColor,
      height: "2px",
    });
  }
  editor.Css.setRule(".header", {
    display: "table",
    width: "100%",
  });
  editor.Css.setRule(".header img", {
    display: "table-cell",
    height: "120px",
  });
  editor.Css.setRule(".header-image-center img", {
    margin: "auto",
  });
  editor.Css.setRule(".header-image-right img", {
    "margin-left": "auto",
  });
  editor.Css.setRule(".footer", {
    width: "100%",
    "text-align": "center",
    position: "fixed",
    bottom: 0,
    padding: "8px",
  });
  editor.Css.setRule(".section", {
    padding: "8px",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "space-between",
  });
  editor.Css.setRule(".menu-item", {
    width: "100%",
    "border-spacing": 0,
  });
  if (selectedFont) {
    let bodyFontUrl = selectedFont.bodyFont.url;
    let headerFontUrl = selectedFont.headerFont.url;
    let titleFontUrl = selectedFont.titleFont.url;

    if (selectedFont.bodyFont.custom) {
      const { data } = supabase.storage.from("fonts").getPublicUrl(bodyFontUrl);
      if (data) bodyFontUrl = data.publicUrl;
    }

    if (selectedFont.headerFont.custom) {
      const { data } = supabase.storage
        .from("fonts")
        .getPublicUrl(headerFontUrl);
      if (data) headerFontUrl = data.publicUrl;
    }

    if (selectedFont.titleFont.custom) {
      const { data } = supabase.storage
        .from("fonts")
        .getPublicUrl(titleFontUrl);
      if (data) titleFontUrl = data.publicUrl;
    }

    editor.Css.addRules(
      `@font-face {
        font-family: ${selectedFont.bodyFont.name.replace(/\.[^/.]+$/, "")};
        src: url("${bodyFontUrl}");
      }
      @font-face {
        font-family: ${selectedFont.headerFont.name.replace(/\.[^/.]+$/, "")};
        src: url("${headerFontUrl}");
      }
      @font-face {
        font-family: ${selectedFont.titleFont.name.replace(/\.[^/.]+$/, "")};
        src: url("${titleFontUrl}");
      }`
    );
    editor.Css.setRule(".font-title", {
      "font-family": selectedFont.titleFont.name.replace(/\.[^/.]+$/, ""),
    });
    editor.Css.setRule(".font-header", {
      "font-family": selectedFont.headerFont.name.replace(/\.[^/.]+$/, ""),
    });
  }
};
