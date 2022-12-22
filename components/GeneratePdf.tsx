import { Document, Page } from "@react-pdf/renderer";
import Html from "react-pdf-html";

interface IGeneratePdfProps {
  html: string;
}

const GeneratePdf = ({ html }: IGeneratePdfProps) => {
  return (
    <Document>
      <Page>
        <Html>{html}</Html>
      </Page>
    </Document>
  );
};

export default GeneratePdf;
