import { useState, useEffect } from 'react'
import { Stack } from "@mantine/core";
import { IFont, IPalette } from "../../interfaces";
import StyleSelector from "./StyleSelector";
import TemplateSelector from "./TemplateSelector";
import grapesjs from "grapesjs";
import DishSelector from "./DishSelector";
import SectionSelector from "./SectionSelector";
import ImageSelector from "./ImageSelector";
import { Button } from '@mantine/core';
import { IconDownload, IconZoomIn, IconZoomOut } from '@tabler/icons';
import AdditionalSelector from './AdditionalSelector';
interface ITemplateMenuBarProps {
  selectedPalette: IPalette | null;
  setSelectedPalette: (palette: IPalette) => void;
  selectedFont: IFont | null;
  setSelectedFont: (font: IFont) => void;
  onTemplateDownload?: () => void;
  editor: grapesjs.Editor;
}

const TemplateMenuBar = ({
  selectedFont,
  setSelectedFont,
  selectedPalette,
  setSelectedPalette,
  onTemplateDownload,
  editor
}: ITemplateMenuBarProps) => {
  const [count, setCount] = useState<number>(100)
  const canvasZoomIn = (zoom: string) => {
    if (zoom === 'zoomIn' && count < 200) {
      setCount((prevState) => prevState + 5)
    }
    if (zoom === 'zoomOut' && count > 60) {
      setCount((prevState) => prevState - 5)
    }

  }
  useEffect(() => {
    editor.Canvas.setZoom(count)
  }, [count])

  return (
    <Stack
      align="center"
      justify="space-between"
      sx={(theme) => ({
        backgroundColor: 'white',
        height: 320,
        width: 56,
        position: "absolute",
        left: "4%",
        top: "24%",
        zIndex: 2,
        borderRadius: 2,
      })}
      py="md"
    >
      <StyleSelector
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        selectedPalette={selectedPalette}
        setSelectedPalette={setSelectedPalette}
      />
      <TemplateSelector
        editor={editor}
      />
      <DishSelector
        editor={editor}
      />
      <SectionSelector
        editor={editor}
      />
      <ImageSelector
        editor={editor}
      />
      <AdditionalSelector
        editor={editor}
      />
      <Button color="green"
        onClick={onTemplateDownload}
        leftIcon={<IconDownload size={30} />}
        styles={(theme) => ({
          root: {
            borderRadius: 2,
            height: 70,
            width: 56,
            paddingLeft: 20,
            paddingRight: 20,
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '1rem',
          },
          leftIcon: {
            marginRight: 0,
          },
        })}
      >
      </Button>
      <Stack sx={{
        position: 'fixed',
        zIndex: 2,
        left: 20,
        bottom: 20,
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: '5px',
      }}
        spacing="xs"
        align="center"
      >
        <IconZoomIn size={25} style={{ cursor: 'pointer' }} onClick={() => canvasZoomIn('zoomIn')} stroke='1px' />
        <small>{count}%</small>
        <IconZoomOut size={25} style={{ cursor: 'pointer' }} onClick={() => canvasZoomIn('zoomOut')} stroke='1px' />
      </Stack>
    </Stack>
  );
};

export default TemplateMenuBar;
