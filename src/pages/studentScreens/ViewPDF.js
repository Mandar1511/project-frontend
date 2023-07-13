import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

export default function ViewPDF() {
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer fileUrl="https://res.cloudinary.com/dwyarvqps/image/upload/v1688907181/cwengvjndgeek4mw12dw.pdf" />
    </Worker>
  );
}
