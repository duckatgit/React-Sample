import { useState, useEffect, useCallback } from "react";
import grapesjs from "grapesjs";
// @ts-ignore
import presetNewsletterPlugin from "grapesjs-preset-newsletter";
import { pdf } from "@react-pdf/renderer";
import "grapesjs/dist/css/grapes.min.css";
import GeneratePdf from "../components/GeneratePdf";
import TemplateHeader from "../components/TemplateHeader";
import downloadBlob from "../helpers/downloadBlob";
import TemplateMenuBar from "../components/SideMenu/TemplateMenuBar";
import {
  loadBlocks,
  loadTheme,
  loadEventListeners,
  loadCommands,
  checkBlocksVersionUpdate,
} from "../grapeJs";
import { IFont, IPalette, ITemplate } from "../interfaces";
import { useDialog, useUser } from "../hooks";
import UpsertTemplateDialog from "../components/UpsertTemplateDialog";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Button, Stack } from "@mantine/core";
import SubscribeToFlapjackDialog from "../components/SubscribeToFlapjackDialog";

const DRAWER_WIDTH = "500px";

const Template = ({ drawerOpened }: { drawerOpened: boolean }) => {
  // const [canvasHeight, setCanvasHeight] = useState<number>(900);
  const [editor, setEditor] = useState<grapesjs.Editor | null>(null);
  const [selectedPalette, setSelectedPalette] = useState<IPalette | null>(null);
  const [selectedFont, setSelectedFont] = useState<IFont | null>(null);
  const [upsertTemplate, openUpsertTemplate, closeUpsertTemplate] =
    useDialog(false);
  const [template, setTemplate] = useState<ITemplate | null>(null);
  const [subscribeDialog, openSubscribeDialog, closeSubscribeDialog] =
    useDialog(false);

  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    setEditor(
      grapesjs.init({
        // Indicate where to init the editor. You can also pass an HTMLElement
        container: "#gjs",
        plugins: [presetNewsletterPlugin],
        // Disable the storage manager for the moment
        storageManager: false,
        deviceManager: {
          devices: [
            {
              name: "Mobile portrait",
              width: "375px",
              widthMedia: "420px",
              height: "410px",
            },
            {
              name: "Desktop",
              width: "576px",
              widthMedia: "",
              height: "820px",
            },
            {
              name: "Tablet",
              width: "420px",
              widthMedia: "576px",
              height: "820px",
            },
          ],
        },
      })
    );
  }, []);

  useEffect(() => {
    if (editor) {
      loadBlocks(editor);
      loadEventListeners(editor);
    }
  }, [editor]);

  useEffect(() => {
    if (editor) loadCommands(editor, user, openSubscribeDialog);
  }, [editor, user, openSubscribeDialog]);

  useEffect(() => {
    if (editor) {
      loadTheme(editor, selectedPalette, selectedFont, supabase);
    }
  }, [editor, selectedFont, selectedPalette, supabase]);

  const fetchTemplate = useCallback(
    async (id: string) => {
      try {
        const { data, error } = await supabase
          .from("templates")
          .select("name, description, content")
          .eq("id", id);
        if (error) throw error;
        if (editor) {
          editor.loadProjectData(data[0].content);
          editor.setDevice(data[0].content.assets[0]);
          setTimeout(() => {
            checkBlocksVersionUpdate(editor);
          }, 2000);
        }
        setTemplate({
          ...data[0],
        });
      } catch (err) {
        console.error(err);
      }
    },
    [editor, supabase]
  );

  useEffect(() => {
    if (editor && router.query.id) {
      fetchTemplate(router.query.id as string);
    }
  }, [editor, router.query.id, fetchTemplate]);

  const onTemplateDownload = async () => {
    if (user && user.subscriptionActive) {
      if (editor) {
        const blob = await pdf(
          <GeneratePdf html={editor.runCommand("gjs-get-inlined-html")} />
        ).toBlob();
        console.log(editor.getHtml());
        downloadBlob(blob, "template.pdf");
        const html = document.createElement("html");
        html.innerHTML = editor.runCommand("gjs-get-inlined-html");
        const body = html.querySelector("body");
        if (body) {
          body.style.width = "816px";
          body.style.height = "1056px";
        }
        // @ts-ignore
        // const html2pdf = (await import("html2pdf.js")).default;
        // html2pdf(html);
      }
    } else {
      openSubscribeDialog();
    }
  };

  const selectedPaletteChange = (palette: IPalette) =>
    setSelectedPalette(palette);

  const selectedFontChange = (font: IFont) => setSelectedFont(font);

  const onTemplateSaveUpdate = () => {
    if (user && user.subscriptionActive) {
      openUpsertTemplate();
    } else {
      openSubscribeDialog();
    }
  };

  // const addPages = () => {
  //   if (editor) {
  //     if (canvasHeight === 900) {
  //       const canvas = editor.Canvas;
  //       canvas.addFrame({
  //         name: "page 2",
  //         x: 0, // Position in canvas
  //         y: "855px",
  //         width: 576, // Frame dimensions
  //         height: 817,
  //         // device: 'DEVICE-ID',
  //         components: [
  //           '<h1 class="testh">Title frame</h1>',
  //           '<p class="testp">Paragraph frame</p>',
  //         ],
  //         styles: `
  //       .testh { color: red; }
  //       .testp { color: blue; }
  //     `,
  //       });
  //     } else if (canvasHeight === 1740) {
  //       const canvas = editor.Canvas;
  //       canvas.addFrame({
  //         name: "page 3",
  //         x: 0, // Position in canvas
  //         y: "1705px",
  //         width: 576, // Frame dimensions
  //         height: 817,
  //         // device: 'DEVICE-ID',
  //         components: [
  //           '<h1 class="testh">Title frame</h1>',
  //           '<p class="testp">Paragraph frame</p>',
  //         ],
  //         styles: `
  //       .testh { color: red; }
  //       .testp { color: blue; }
  //     `,
  //       });
  //     } else if (canvasHeight === 2580) {
  //       const canvas = editor.Canvas;
  //       canvas.addFrame({
  //         name: "page 4",
  //         x: 0, // Position in canvas
  //         y: 2560,
  //         width: 576, // Frame dimensions
  //         height: 817,
  //         // device: 'DEVICE-ID',
  //         components: [
  //           '<h1 class="testh">Title frame</h1>',
  //           '<p class="testp">Paragraph frame</p>',
  //         ],
  //         styles: `
  //       .testh { color: red; }
  //       .testp { color: blue; }
  //     `,
  //       });
  //     }

  //     setCanvasHeight((prevSate) => prevSate + 840);
  //   }
  // };

  return (
    <>
      <TemplateHeader
        onTemplateDownload={onTemplateDownload}
        onTemplateSaveUpdate={onTemplateSaveUpdate}
      />
      <SubscribeToFlapjackDialog
        onClose={closeSubscribeDialog}
        opened={subscribeDialog}
      />
      {editor && (
        <TemplateMenuBar
          selectedFont={selectedFont}
          setSelectedFont={selectedFontChange}
          selectedPalette={selectedPalette}
          setSelectedPalette={selectedPaletteChange}
          editor={editor}
          onTemplateDownload={onTemplateDownload}
        />
      )}
      {editor && upsertTemplate && (
        <UpsertTemplateDialog
          opened={upsertTemplate}
          onClose={closeUpsertTemplate}
          content={{ ...editor.getProjectData(), assets: [editor.getDevice()] }}
          template={template}
        />
      )}
      <div
        id="gjs"
        style={{
          // minHeight: canvasHeight,
          paddingRight: drawerOpened ? DRAWER_WIDTH : "0px",
        }}
      />
      <Stack
        align="center"
        sx={() => ({
          backgroundColor: "#3a3a3a",
          paddingTop: "10px",
          paddingBottom: "10px",
          width: drawerOpened ? `calc(100% - ${DRAWER_WIDTH})` : "100%",
        })}
      >
        <Button color="yellow.9">+ Add Pages</Button>
      </Stack>
    </>
  );
};

export default Template;
